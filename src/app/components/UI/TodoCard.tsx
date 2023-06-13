'use client'
import { useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import { Bs0Square, Bs8SquareFill, BsBagCheck, BsChatSquare, BsCloudArrowDown, BsCode, BsSquareFill, BsXCircle } from 'react-icons/bs';
import { useBoardStore } from '@/store/BoardStore';
import {  getUserName, addComment, delComment, archiveComment, getComment } from '@/lib/todoAccess';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

interface comment {
    message : string,
    name: string,
    role: string,
    user: string,
    id: string,
    $id: string,
  }


function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
  const deleteTodoInDB = useBoardStore((state) => state.deleteTodoInDB);
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation2, setShowConfirmation2] = useState(false);
  const [showConfirmation3, setShowConfirmation3] = useState(false);
  const [userName, setUserName] = useState('');

  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [_id, set_id] = useState('');
  const [user, setUser] = useState('');
  const [comments, setComments] = useState<comment[]>([]);
  const [__id,set__id] = useState('');
  const [___id,set___id] = useState('');

  const handleToggleSidebar = async (id?: string) => {
    setOpen((prevOpen) => !prevOpen);
    if (!open) {
      if (id) {
        const commentsData = await handleComment(id);
        if (commentsData !== void 0){
        setComments(commentsData);
        }
      }
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
    if (!open)
      handleToggleSidebar();
  };

  const handleConfirmDelete = () => {
    if (deleteTodoInDB) {
      deleteTodoInDB(index, todo, id);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete2 = () => {
    delComment(__id);
    setShowConfirmation2(false);
  };

  const handleCancelDelete2 = () => {
    setShowConfirmation2(false);
  };

  const handleConfirmDelete3 = () => {
    archiveComment(___id);
    setShowConfirmation3(false);
  };

  const handleCancelDelete3 = () => {
    setShowConfirmation3(false);
  };

  const handleComment = async (id: string) => {
    const commentsData : any = await getComment(id);
    if (commentsData) {
      setComments(commentsData);
    }
  };

  const handleArchive = async (id : string) => {
        set___id(id);
        setShowConfirmation3(true);
        if (!open)
        handleToggleSidebar();
  }

  useEffect(() => {
    const handleUserName = async (id: any) => {
      const namePromise = getUserName(id);
      const name = await namePromise;

      const test: string | void = name;
      if (typeof test === 'string') {
        setUserName(test);
      }
    };

    if (todo.user) {
      handleUserName(todo.user);
    }
  }, [todo.user]);


  const handleDeleteComment = async (id : string) => {
    set__id(id);
    setShowConfirmation2(true);
    if (!open)
      handleToggleSidebar();
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedUser = formData.get('user') as string;
    const updated_id = formData.get('_id') as string;
    const updatedRole = formData.get('role') as string;

    addComment(updated_id.toString(), updatedUser.toString(), message.toString(), userName.toString(), updatedRole.toString());
  };

  return (
    <div className="bg-white space-y-2 drop-shadow-sm" {...draggableProps} {...dragHandleProps} ref={innerRef}>

      <div className={`${open ? 'min:h-72' : 'h-10'} z-0`} >
        <div className='px-2'>
          <div className="flex justify-between items-center bg-slate-50/80 p-2 border-slate-400 border-t-2 h-10">
            <span>
              <div className="text-slate-600">{todo.type_Request}</div>
            </span>
            <span>
              <button className="text-red-600 hover:text-red-200">
                <BsChatSquare
                  onClick={() => handleToggleSidebar(todo.$id)}
                  className="h-5 w-6 ml-5"
                />
              </button>
              {todo.status == 'done' && (
                    <button className='text-black'>
                    <BsCloudArrowDown
                    className="h-5 w-6 ml-5"
                    onClick={() => handleArchive(todo.$id)}
                    />
                    </button>
                )}
              <button className="text-red-600 hover:text-red-200">
                <BsXCircle
                  onClick={handleDeleteClick}
                  className="h-5 w-6 ml-5"
                />
              </button>
            </span>
          </div>
        </div>
        {open && (
          <>
            <div className='w-full h-44 z-10 mt-2 px-2 text-black'>
              <h3 className='mb-2 font-semibold'>Message:</h3>
              <p>{todo.message}</p>
            </div>
              <div className='text-black'>
                <span>User:</span> <input value={userName} onChange={(e) => setUserName(e.target.value)} readOnly />
              </div>


              <div className=" text-slate-900">
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start mb-4">

                    <div className="flex-grow ring-2 p-2 m-2">
                        <div className="flex items-center mb-1">
                        <p className="text-lg font-bold">{comment.name}</p>
                        <p className="text-gray-500 ml-2">{comment.role}</p>
                        </div>
                        <p className="text-gray-700">{comment.message}</p>
                    </div>
                    <button
                        onClick={() => handleDeleteComment(comment.$id)}
                        className="ml-2 mt-2 text-red-500 hover:text-red-700"
                    >
                        <BsXCircle/>
                    </button>
                    </div>

                ))}


        </div>
            <form onSubmit={handleSubmit}>
              <div className='text-black hidden'>
                <input name='role' onChange={(e) => setRole(e.target.value)} value={todo.role} />
                <input name='user' onChange={(e) => setUser(e.target.value)} value={todo.user} />
                <input name='_id' onChange={(e) => set_id(e.target.value)} value={todo.$id} />
              </div>
              <div className=' text-slate-800 mt-2'>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='h-16 ring-2 rounded-md w-full p-2' required></textarea>
                <div className='h-10'>
                  <div className='flex float-right hover:font-bold'>
                    <button type='submit' className=''>Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>


      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-end justify-center px-2">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* Heroicon name: exclamation */}
                  <svg
                    className="h-6 w-6 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938-9L12 4.062l6.938 6.938M20.062 12L12 19.062l-8.062-8.062"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Request</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to delete this request?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleCancelDelete}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {showConfirmation2 && (
        <div className="fixed z-10 pb-5 inset-0 overflow-y-auto flex items-end justify-center px-2">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="bg-white rounded-md p-4 z-10 text-black">
            <p>Do you want to proceed with deleting the comment?</p>
            <div className="flex justify-end mt-4">
              <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleConfirmDelete2}>
                Yes
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={handleCancelDelete2}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

    {showConfirmation3 && (
        <div className="fixed z-10 pb-5 inset-0 overflow-y-auto flex items-end justify-center px-2">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="bg-white rounded-md p-4 z-10 text-black">
            <p>would you proceed in Archiving this Request?</p>
            <div className="flex justify-end mt-4">
              <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleConfirmDelete3}>
                Yes
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={handleCancelDelete3}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TodoCard;
