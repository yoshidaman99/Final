import { initFirebase } from '@/firebase/firebaseApp';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Initialize Firebase app
initFirebase(); // Make sure to implement the `initFirebase` function to initialize Firebase

type TypedColumn = 'todo' | 'inprogress' | 'done';

interface Todo {
  $id?: string;
  id?: string;
  title: string;
  status: TypedColumn; // Update the type to TypedColumn
  role: string;
  type_Request: string;
  message: string;
  user: string;
  image?: string;
  contact?: string;
  email?: string;
  gender? : string;
  birthdate?: string;
  studentID?: string;
}

interface Column {
  id: string;
  todo: Todo[];
}

interface Board {
  columns: Map<TypedColumn, Column>;
}

export const getTodosGroupedByColumn = async () => {
  const db = getFirestore(); // Get Firestore instance
  const app = initFirebase();
  const auth = getAuth();

  const todosCollection = collection(db, 'todos');

  const q = query(todosCollection, where('archive', '!=', true));

  const snapshot = await getDocs(q);
  const todos = snapshot.docs.map((doc) => {
    const data = doc.data() as Todo;
    return { $id: doc.id, ...data };
  });
  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todo: [],
      });
    }

    acc.get(todo.status)!.todo.push({
      contact: todo.contact,
      email: todo.email,
      $id: todo.$id,
      id: todo.id,
      title: todo.title,
      status: todo.status,
      role: todo.role,
      type_Request: todo.type_Request,
      message: todo.message,
      user: todo.user,
      gender :  todo.gender,
      birthdate: todo.birthdate,
      studentID: todo.studentID,
      ...(todo.image && { image: todo.image }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todo: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
