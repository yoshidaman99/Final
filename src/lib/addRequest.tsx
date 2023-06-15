import {
  getAuth,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

const navigateToAddress = (address:string) => {
    window.location.href = address;
  };

export const addRequest = async ( title: string, message: string, requestList: string, role: string ) => {
    // Create a reference to the Firestore database
    const firestore = getFirestore();

    // Specify the collection where you want to add the document
    const collectionRef = collection(firestore, "todos");

    const auth = getAuth();
    const usersCurrent = auth.currentUser;

    const $id = usersCurrent?.uid;

     // Define the data you want to add to the document
     const data = {
        id: collectionRef.id,
        user: $id,
        title: title,
        message: message,
        type_Request: requestList,
        image: '',
        archive: false,
        role: role,
        status: 'todo',
    };

    // Add the document to the collection
    const docRef = await addDoc(collectionRef, data);

    const _id = docRef.id;
    const requestRef = doc(firestore, 'todos', _id);

    const _data = {
        id: _id,
    };

    await updateDoc(requestRef, _data);
    navigateToAddress('/dashboard/Requests/');
 }