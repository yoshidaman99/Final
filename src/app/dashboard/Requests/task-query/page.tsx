"use client"
import { useEffect } from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';
import { useBoardStore } from '@/store/BoardStore';
import { DragDropContext, DropResult, Draggable, Droppable } from 'react-beautiful-dnd';
import Column from '@/app/components/UI/columns';
import SearchBar from '@/app/components/UI/search';


export const metadata: Metadata = {
  title: 'Query Task',
};

export default function Page() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB,
  ]);


  useEffect(() => {
    if (getBoard) {
      getBoard();
    }
  }, [getBoard]);


    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        // Check if the user dragged card outside the board
        if (!destination) return;

        // Handle column drag
        if (type === "column") {
          const entries = Array.from(board.columns.entries());
          const [removed] = entries.splice(source.index, 1);
          entries.splice(destination.index, 0, removed);
          const rearrangedColumns = new Map(entries);
          setBoardState({ ...board, columns: rearrangedColumns });
        }

        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        if (!startColIndex || !finishColIndex) return;

        const startCol: Column = {
          id: startColIndex[0],
          todo: startColIndex[1].todo,
        };

        const finishCol: Column = {
          id: finishColIndex[0],
          todo: finishColIndex[1].todo,
        };

        if (source.index === destination.index && startCol === finishCol) {
          return;
        }

        const newTodo = startCol.todo;
        const [todoMoved] = newTodo.splice(source.index, 1);

        if (startCol.id === finishCol.id) {
          newTodo.splice(destination.index, 0, todoMoved);
          const newCol = {
            id: startCol.id,
            todo: newTodo,
          };

          const newColumns = new Map(board.columns);
          newColumns.set(startCol.id, newCol);

          setBoardState({ ...board, columns: newColumns });
        } else {
          const finishTodo = Array.from(finishCol.todo);
          finishTodo.splice(destination.index, 0, todoMoved);

          const newColumns = new Map(board.columns);
          const newCol = {
            id: startCol.id,
            todo: newTodo,
          };

          newColumns.set(startCol.id, newCol);
          newColumns.set(finishCol.id, {
            id: finishCol.id,
            todo: finishTodo,
          });

          // Update the Database
          if (updateTodoInDB) updateTodoInDB(todoMoved, finishCol.id);

          setBoardState({ ...board, columns: newColumns });
        }
      };

      return (
        <section>
          <div>
            <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
          </div>
          <div className='flex w-full items-center justify-center'>
            <div className='w-1/3'>
              <SearchBar database='' />
            </div>
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
              {(provided) => (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto' {...provided.droppableProps} ref={provided.innerRef}>
                  {Array.from(board.columns.entries()).map(([id, column], index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <Column id={id} todos={column.todo} index={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      );
    }
