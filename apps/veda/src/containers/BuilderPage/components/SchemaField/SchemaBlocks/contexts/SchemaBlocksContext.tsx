import { useCollapseActions } from 'components/Collapse';
import { HandleCloseParam } from 'components/Collapse/Collapse';
import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { SettingBlock } from 'types/Schema';
import storage from 'utils/functions/storage';
import { v4 } from 'uuid';
import { CLIPBOARD_OF_SCHEMA_Block_IN_LOCAL_STORAGE, COLLAPSE_GROUP_NAME_BLOCKS, COLLAPSE_GROUP_NAME_BLOCKS_CHILD } from '../const';
import {
  Actions,
  CopyBlock,
  DeleteBlock,
  DeleteBlockChild,
  EditBlock,
  EditBlockChild,
  PasteBlock,
  reducer,
  SortBlock,
  SortBlockChild,
} from '../reducer';
import { SchemaBlocksProps } from '../type';

interface SchemaBlocksContext {
  blocks: SettingBlock[];
  clipboard: Omit<SettingBlock, 'id'> | undefined;
  addBlock: () => void;
  sortBlock: (params: SortBlock['payload']) => void;
  duplicateBlock: (blockIndex: number) => void;
  deleteBlock: (params: DeleteBlock['payload']) => void;
  editBlock: (params: EditBlock['payload']) => void;
  addBlockChild: (params: Pick<EditBlockChild['payload'], 'blockId'>) => void;
  sortBlockChild: (params: SortBlockChild['payload']) => void;
  duplicateBlockChild: (params: { blockIndex: number; blockChildIndex: number }) => void;
  deleteBlockChild: (params: DeleteBlockChild['payload']) => void;
  editBlockChild: (params: EditBlockChild['payload']) => void;
  openCollapse: (params: HandleCloseParam) => void;
  closeCollapse: (params: HandleCloseParam) => void;
  copyBlock: (params: CopyBlock['payload']) => void;
  pasteBlock: (params: PasteBlock['payload']) => void;
}

const count: Record<string, number> = {};
const SchemaBlocksContext = createContext<SchemaBlocksContext | null>(null);

export const useSchemaBlocks = () => {
  const context = useContext(SchemaBlocksContext);
  return context as SchemaBlocksContext;
};

export const SchemaBlocksProvider: FC<SchemaBlocksProps> = ({ section, onUpdate, onChange, children }) => {
  const { blocks } = section.data.schema;
  const { onClose, onOpen } = useCollapseActions();
  const [state, dispatch] = useReducer(reducer, {
    blocks,
    clipboard: (() => {
      try {
        return JSON.parse(storage.getItem(CLIPBOARD_OF_SCHEMA_Block_IN_LOCAL_STORAGE) ?? '');
      } catch {
        storage.removeItem(CLIPBOARD_OF_SCHEMA_Block_IN_LOCAL_STORAGE);
        return undefined;
      }
    })(),
  });
  const { blocks: _blocks, clipboard } = state;

  const _dispatch = (action: Actions) => {
    dispatch(action);
    if (action.type !== '@SchemasBlocks/copyBlock' && action.type !== '@SchemasBlocks/setBlocks') {
      onUpdate?.(action);
    }
  };

  const handleAddBlock: SchemaBlocksContext['addBlock'] = () => {
    const newBlock: SettingBlock = {
      id: `id_${v4()}`,
      children: [],
      type: 'object',
      label: ``,
      summary: ``,
      name: ``,
      open: false,
      drawer: false,
      disable: false,
      deps: undefined,
      forceRenderSection: false,
    };
    _dispatch({
      type: '@SchemaBlocks/addBlock',
      payload: { newBlock },
    });
    onClose({ groupName: COLLAPSE_GROUP_NAME_BLOCKS });
    onOpen({ groupName: COLLAPSE_GROUP_NAME_BLOCKS, name: newBlock.id });
  };
  const handleSortBlock: SchemaBlocksContext['sortBlock'] = ({ destinationIndex, sourceIndex }) => {
    _dispatch({
      type: '@SchemaBlocks/sortBlock',
      payload: {
        destinationIndex,
        sourceIndex,
      },
    });
  };
  const handleDuplicateBlock: SchemaBlocksContext['duplicateBlock'] = blockIndex => {
    const block = _blocks[blockIndex];
    const sourceItem = block;
    count[sourceItem.name] = count[sourceItem.name] ? count[sourceItem.name] + 1 : 1;
    const newBlock = {
      ...sourceItem,
      id: `id_${v4()}`,
      name: sourceItem.name.concat(count[sourceItem.name].toString()),
      label: typeof sourceItem.label === 'string' ? sourceItem.label.concat(count[sourceItem.name].toString()) : sourceItem.label,
    };
    _dispatch({
      type: '@SchemasBlocks/insertBlock',
      payload: {
        blockId: sourceItem.id,
        index: blockIndex + 1,
        newBlock,
      },
    });
    onClose({ groupName: COLLAPSE_GROUP_NAME_BLOCKS });
    onOpen({ groupName: COLLAPSE_GROUP_NAME_BLOCKS, name: newBlock.id });
  };
  const handleDeleteBlock: SchemaBlocksContext['deleteBlock'] = ({ blockId }) => {
    _dispatch({
      type: '@SchemasBlocks/deleteBlock',
      payload: {
        blockId,
      },
    });
  };

  const handleEditBlock: SchemaBlocksContext['editBlock'] = ({ blockId, newData }) => {
    _dispatch({
      type: '@SchemasBlocks/editBlock',
      payload: { blockId, newData },
    });
  };

  const handleAddBlockChild: SchemaBlocksContext['addBlockChild'] = ({ blockId }) => {
    const newBlockChild: SettingBlock['children'][number] = {
      children: '',
      type: 'text',
      label: ``,
      summary: ``,
      name: ``,
      id: `id_${v4()}`,
      disable: false,
      deps: undefined,
      forceRenderSection: false,
      // @ts-ignore
      enabledMulti: true,
    };
    _dispatch({
      type: '@SchemaBlocks/addBlockChild',
      payload: {
        blockId,
        newBlockChild,
      },
    });
    onClose({ groupName: COLLAPSE_GROUP_NAME_BLOCKS_CHILD });
    onOpen({ groupName: COLLAPSE_GROUP_NAME_BLOCKS_CHILD, name: newBlockChild.id });
  };

  const handleSortBlockChild: SchemaBlocksContext['sortBlockChild'] = ({ blockId, destinationIndex, sourceIndex }) => {
    _dispatch({
      type: '@SchemaBlocks/sortBlockChild',
      payload: {
        blockId,
        sourceIndex,
        destinationIndex,
      },
    });
  };

  const handleDuplicateBlockChild: SchemaBlocksContext['duplicateBlockChild'] = ({ blockIndex, blockChildIndex }) => {
    const block = _blocks[blockIndex];
    const sourceItem = block.children[blockChildIndex];
    count[`${block.name}_${sourceItem.name}`] = count[`${block.name}_${sourceItem.name}`] ? count[`${block.name}_${sourceItem.name}`] + 1 : 1;
    const newBlockChild = {
      ...sourceItem,
      id: `id_${v4()}`,
      name: sourceItem.name.concat(count[`${block.name}_${sourceItem.name}`].toString()),
      label: typeof sourceItem.label === 'string' ? sourceItem.label.concat(count[`${block.name}_${sourceItem.name}`].toString()) : sourceItem.label,
    };
    if (blockChildIndex !== -1) {
      _dispatch({
        type: '@SchemasBlocks/insertBlockChild',
        payload: {
          blockId: block.id,
          index: blockChildIndex + 1,
          newBlockChild,
        },
      });
      onClose({ groupName: COLLAPSE_GROUP_NAME_BLOCKS_CHILD });
      onOpen({ groupName: COLLAPSE_GROUP_NAME_BLOCKS_CHILD, name: newBlockChild.id });
    }
  };

  const handleDeleteBlockChild: SchemaBlocksContext['deleteBlockChild'] = ({ blockId, blockChildId }) => {
    _dispatch({
      type: '@SchemasBlocks/deleteBlockChild',
      payload: {
        blockChildId,
        blockId,
      },
    });
  };

  const handleEditBlockChild: SchemaBlocksContext['editBlockChild'] = ({ blockId, blockChildId, newData }) => {
    _dispatch({
      type: '@SchemasBlocks/editBlockChild',
      payload: {
        blockChildId,
        blockId,
        newData,
      },
    });
  };

  const handleCopyBlock: SchemaBlocksContext['copyBlock'] = ({ blockId }) => {
    _dispatch({
      type: '@SchemasBlocks/copyBlock',
      payload: { blockId },
    });
  };

  const handlePasteBlock: SchemaBlocksContext['pasteBlock'] = ({ blockId, newData }) => {
    _dispatch({
      type: '@SchemasBlocks/pasteBlock',
      payload: { blockId, newData },
    });
  };

  useEffect(() => {
    _dispatch({
      type: '@SchemasBlocks/setBlocks',
      payload: {
        blocks,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  useEffect(() => {
    onChange?.(_blocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_blocks]);

  return (
    <SchemaBlocksContext.Provider
      value={{
        blocks: _blocks,
        clipboard,
        addBlock: handleAddBlock,
        sortBlock: handleSortBlock,
        duplicateBlock: handleDuplicateBlock,
        deleteBlock: handleDeleteBlock,
        editBlock: handleEditBlock,
        addBlockChild: handleAddBlockChild,
        sortBlockChild: handleSortBlockChild,
        duplicateBlockChild: handleDuplicateBlockChild,
        deleteBlockChild: handleDeleteBlockChild,
        editBlockChild: handleEditBlockChild,
        closeCollapse: onClose,
        openCollapse: onOpen,
        copyBlock: handleCopyBlock,
        pasteBlock: handlePasteBlock,
      }}
    >
      {children}
    </SchemaBlocksContext.Provider>
  );
};
