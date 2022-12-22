import { ReactNode, useEffect, useState } from 'react';
import {
  DragDropContext,
  DragDropContextProps,
  Draggable,
  DraggableProvidedDragHandleProps,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import delay from 'utils/functions/delay';
import { View, ViewProps } from 'wiloke-react-core';

interface DataDefault {
  id: string;
}

export interface RenderItemParam<T extends DataDefault> {
  item: T;
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging: boolean;
}

export interface SortableProps<T extends DataDefault> extends Omit<DragDropContextProps, 'children'> {
  data: T[];
  renderItem: ({ item, index, dragHandleProps }: RenderItemParam<T>) => ReactNode;
  keyExtractor?: (item: T) => string;
  itemCss?: ViewProps['css'];
  containerCss?: ViewProps['css'];
  droppableId?: string;
  type?: string;
}

const Sortable = <T extends { id: string }>({
  data,
  renderItem,
  keyExtractor = item => item.id,
  itemCss,
  containerCss,
  droppableId = 'droppable',
  type,
  onDragStart,
  onDragUpdate,
  onDragEnd,
  ...rest
}: SortableProps<T>) => {
  const [status, setStatus] = useState<'start' | 'update' | 'end'>('start');
  const [result, setResult] = useState<DropResult | null>(null);
  const [provided, setProvided] = useState<ResponderProvided | null>(null);
  const [mouseUp, setMouseUp] = useState(false);

  useEffect(() => {
    if (status === 'end') {
      setResult(null);
      setProvided(null);
    }
  }, [status]);

  const handleItemMouseUp = async () => {
    await delay(2000);
    setMouseUp(true);
  };

  const handleDragStart = (initial: DragStart, provided: ResponderProvided) => {
    setStatus('start');
    setMouseUp(false);
    setResult({
      ...initial,
      reason: 'DROP',
      destination: {
        droppableId: 'droppable',
        index: initial.source.index,
      },
    });
    setProvided(provided);
    onDragStart?.(initial, provided);
  };

  const handleDragUpdate = (initial: DragUpdate, provided: ResponderProvided) => {
    setStatus('update');
    setResult({ ...initial, reason: 'DROP' });
    setProvided(provided);
    onDragUpdate?.(initial, provided);
  };

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    setStatus('end');
    if (status !== 'end') {
      onDragEnd?.(result, provided);
    }
  };

  const handleWindowMouseMove = () => {
    if (status !== 'update' && mouseUp && result && provided) {
      handleDragEnd(result, provided);
    }
  };

  useEffect(() => {
    if (status === 'start') {
      window.addEventListener('mousemove', handleWindowMouseMove);
    } else if (status === 'end') {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <DragDropContext {...rest} onDragStart={handleDragStart} onDragUpdate={handleDragUpdate} onDragEnd={handleDragEnd}>
      <Droppable type={type} droppableId={droppableId}>
        {provided => (
          <View {...provided.droppableProps} ref={provided.innerRef} css={containerCss} onMouseUp={handleItemMouseUp}>
            {data.map((item, index) => (
              <Draggable key={keyExtractor(item)} draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                  return (
                    <View
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      style={{
                        ...provided.draggableProps.style,
                        ...(!!provided.draggableProps.style?.transform
                          ? { transform: `${provided.draggableProps.style?.transform?.replace(/\(.*,/g, '(0,')}` }
                          : {}),
                      }}
                      css={itemCss}
                    >
                      {renderItem({ item, index, dragHandleProps: provided.dragHandleProps, isDragging: snapshot.isDragging })}
                    </View>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </View>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Sortable;
