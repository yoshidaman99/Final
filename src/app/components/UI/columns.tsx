import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BsPlusCircle } from 'react-icons/bs';
import TodoCard from '@/app/components/UI/TodoCard';
import { useBoardStore } from '@/store/BoardStore';

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

const idToColumnText: {
    [key in TypedColumn]: string;

} = {
    'todo' : 'To Do',
    'inprogress' : 'In Progress',
    'done' : 'Done',
}

function Column({ id, todos, index }: Props) {

    const [searchString] = useBoardStore((state)=>[state.searchString]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
            className='pt-2'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 shadow-sm ${
                  snapshot.isDraggingOver ? 'bg-green-200 text-[#2E3840]' : 'bg-[#2E3840] text-white'
                }`}
              >
                <div>
                <h2 className='flex justify-between'>
                    {idToColumnText[id]}
                    <span className=' text-slate-800 bg-gray-200 rounded-full py-1 px-2 text-sm font-bold'>
                        {!searchString ? todos.length : todos.filter(todo=>todo.title.toLowerCase().includes(searchString.toLowerCase())).length}
                    </span>
                </h2>
                </div>
                <div className='space-y-2 py-2'>
                    {todos.map((todo,index)=>{

                            if(searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase()))
                            return;
                            return(
                            <Draggable
                                key={todo.$id}
                                draggableId={todo.$id}
                                index={index}
                            >
                                {(provided)=>(
                                    <TodoCard
                                        todo={todo}
                                        index={index}
                                        id={id}
                                        innerRef={provided.innerRef}
                                        draggableProps={provided.draggableProps}
                                        dragHandleProps={provided.dragHandleProps}
                                    />
                                )}
                            </Draggable>

                            )

                    })}

                    {provided.placeholder}

                    <div className='flex items-end justify-end p-2'>

                    </div>
                </div>

              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
