import { getFirestore, collection, query, where, addDoc , updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { create } from 'zustand';
import { initFirebase } from '@/firebase/firebaseApp';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { sendEmail } from "@/lib/sendEmail";


interface Column {
  id: TypedColumn;
  todo: Todo[];
}

interface Board {
  columns: Map<TypedColumn, Column>;
}

interface BoardState {
  board: Board;
  getBoard?: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB?: (todo: Todo, columnId: TypedColumn) => void;
  deleteTodoInDB?: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => {
  const app = initFirebase();
  const db = getFirestore(app);
  const storage = getStorage(app);

  return {
    board: {
      columns: new Map<TypedColumn, Column>(),
    },
    getBoard: async () => {
      const board: any = await getTodosGroupedByColumn();
      set({ board });
    },
    setBoardState: (board) => set({ board }),
    updateTodoInDB: async (todo, columnId) => {
        const todoDocRef = doc(db, 'todos', todo.$id); // Assuming `todo.$id` represents the document ID

        if (columnId === 'done'){

          await updateDoc(todoDocRef, {
            title: todo.title,
            status: columnId,
            completedAt: Timestamp.fromMillis(Date.now()),
          });

        }else{

          await updateDoc(todoDocRef, {
            title: todo.title,
            status: columnId,
          });

        }

      },
    deleteTodoInDB: async (taskIndex, todo, id) => {
      const todosCollectionRef = collection(db, 'todos');
      const todoDocRef = doc(todosCollectionRef, todo.$id);

      const newColumns = new Map(get().board.columns);
      newColumns.get(id)?.todo.splice(taskIndex, 1);
      set({ board: { columns: newColumns } });

      // Image removal
      if (todo.image) {
        const storage = getStorage();
        const fileRef = ref(storage, todo.image.bucketId); // Update property name to 'path'
        await deleteObject(fileRef);
      }

      await deleteDoc(todoDocRef);
    },
    searchString: "",
    setSearchString: (searchString) => set({ searchString }),
  };
});
