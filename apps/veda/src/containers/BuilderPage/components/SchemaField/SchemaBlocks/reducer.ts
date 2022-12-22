import { insert } from 'ramda';
import { SettingBlock } from 'types/Schema';
import reorder from 'utils/functions/reorder';
import storage from 'utils/functions/storage';
import { CLIPBOARD_OF_SCHEMA_Block_IN_LOCAL_STORAGE } from './const';

interface State {
  blocks: SettingBlock[];
  clipboard: Omit<SettingBlock, 'id'> | undefined;
}

export interface SetBlocks {
  type: '@SchemasBlocks/setBlocks';
  payload: {
    blocks: SettingBlock[];
  };
}

export interface AddBlock {
  type: '@SchemaBlocks/addBlock';
  payload: {
    newBlock: SettingBlock;
  };
}

export interface SortBlock {
  type: '@SchemaBlocks/sortBlock';
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
}

export interface InsertBlock {
  type: '@SchemasBlocks/insertBlock';
  payload: {
    blockId: SettingBlock['id'];
    newBlock: SettingBlock;
    index: number;
  };
}

export interface DeleteBlock {
  type: '@SchemasBlocks/deleteBlock';
  payload: {
    blockId: SettingBlock['id'];
  };
}

export interface EditBlock {
  type: '@SchemasBlocks/editBlock';
  payload: {
    blockId: SettingBlock['id'];
    newData: Partial<SettingBlock>;
  };
}

export interface SortBlockChild {
  type: '@SchemaBlocks/sortBlockChild';
  payload: {
    blockId: SettingBlock['id'];
    sourceIndex: number;
    destinationIndex: number;
  };
}

export interface AddBlockChild {
  type: '@SchemaBlocks/addBlockChild';
  payload: {
    newBlockChild: SettingBlock['children'][number];
    blockId: SettingBlock['id'];
  };
}

export interface InsertBlockChild {
  type: '@SchemasBlocks/insertBlockChild';
  payload: {
    blockId: SettingBlock['id'];
    newBlockChild: SettingBlock['children'][number];
    index: number;
  };
}

export interface DeleteBlockChild {
  type: '@SchemasBlocks/deleteBlockChild';
  payload: {
    blockId: SettingBlock['id'];
    blockChildId: SettingBlock['children'][number]['id'];
  };
}

export interface EditBlockChild {
  type: '@SchemasBlocks/editBlockChild';
  payload: {
    blockId: SettingBlock['id'];
    blockChildId: SettingBlock['children'][number]['id'];
    newData: Partial<SettingBlock['children'][number]>;
  };
}

export interface CopyBlock {
  type: '@SchemasBlocks/copyBlock';
  payload: {
    blockId: SettingBlock['id'];
  };
}

export interface PasteBlock {
  type: '@SchemasBlocks/pasteBlock';
  payload: {
    blockId: SettingBlock['id'];
    newData: Exclude<State['clipboard'], undefined>;
  };
}

export type Actions =
  | SetBlocks
  | AddBlock
  | SortBlock
  | EditBlock
  | DeleteBlock
  | InsertBlock
  | AddBlockChild
  | SortBlockChild
  | EditBlockChild
  | DeleteBlockChild
  | InsertBlockChild
  | CopyBlock
  | PasteBlock;

export type OnUpdate = Exclude<Actions, SetBlocks>;

export const initialState: State = {
  blocks: [],
  clipboard: undefined,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case '@SchemasBlocks/setBlocks': {
      const { blocks } = action.payload;
      return {
        ...state,
        blocks,
      };
    }
    case '@SchemaBlocks/addBlock': {
      const { newBlock } = action.payload;
      return {
        ...state,
        blocks: state.blocks.concat(newBlock),
      };
    }
    case '@SchemaBlocks/sortBlock': {
      const { destinationIndex, sourceIndex } = action.payload;
      return {
        ...state,
        blocks: reorder(state.blocks, sourceIndex, destinationIndex),
      };
    }
    case '@SchemasBlocks/editBlock': {
      const { blockId, newData } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              ...newData,
            };
          }
          return block;
        }),
      };
    }
    case '@SchemasBlocks/deleteBlock': {
      const { blockId } = action.payload;
      return {
        ...state,
        blocks: state.blocks.filter(block => block.id !== blockId),
      };
    }
    case '@SchemasBlocks/insertBlock': {
      const { index, newBlock } = action.payload;
      return {
        ...state,
        blocks: insert(index, newBlock, state.blocks),
      };
    }
    case '@SchemaBlocks/addBlockChild': {
      const { newBlockChild, blockId } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              children: block.children.concat(newBlockChild),
            };
          }
          return block;
        }),
      };
    }
    case '@SchemaBlocks/sortBlockChild': {
      const { blockId, sourceIndex, destinationIndex } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              children: reorder(block.children, sourceIndex, destinationIndex),
            };
          }
          return block;
        }),
      };
    }
    case '@SchemasBlocks/editBlockChild': {
      const { blockChildId, blockId, newData } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              children: block.children.map(blockChild => {
                if (blockChild.id === blockChildId) {
                  return {
                    ...blockChild,
                    ...newData,
                  } as SettingBlock['children'][number];
                }
                return blockChild;
              }),
            };
          }
          return block;
        }),
      };
    }
    case '@SchemasBlocks/deleteBlockChild': {
      const { blockId, blockChildId } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              children: block.children.filter(blockChild => blockChild.id !== blockChildId),
            };
          }
          return block;
        }),
      };
    }
    case '@SchemasBlocks/insertBlockChild': {
      const { blockId, index, newBlockChild } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              children: insert(index, newBlockChild, block.children),
            };
          }
          return block;
        }),
      };
    }
    case '@SchemasBlocks/copyBlock': {
      const { blockId } = action.payload;
      const sourceBlock = state.blocks.find(block => block.id === blockId);
      if (sourceBlock) {
        const { id: _, ...sourceBlock_ } = sourceBlock;
        storage.setItem(CLIPBOARD_OF_SCHEMA_Block_IN_LOCAL_STORAGE, JSON.stringify(sourceBlock_));
        return {
          ...state,
          clipboard: sourceBlock_,
        };
      }
      return {
        ...state,
        clipboard: undefined,
      };
    }
    case '@SchemasBlocks/pasteBlock': {
      const { blockId, newData } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              ...newData,
            };
          }
          return block;
        }),
      };
    }
    default:
      return state;
  }
};
