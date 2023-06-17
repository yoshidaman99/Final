
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

export async function getUserName(id: string) {
    try {
        const firestore = getFirestore();

        // Create a query to retrieve the user document with the matching ID
        const usersCollection = collection(firestore, "admins");
        const userQuery = query(usersCollection, where("ID", "==", id));

        // Get the snapshot of the query result
        const snapshot = await getDocs(userQuery);

        if (!snapshot.empty) {
            // Retrieve the first matching document
            const document = snapshot.docs[0].data();

            // Get the job role from the document
            const fname = document.first_name;
            const lname = document.last_name;
            return fname + ' ' + lname;
        }

    } catch (error) {
        console.error('Error fetching username:', error);
        throw error;
    }
}

 export async function addComment(id: string, user: string, message: string, name: string, role: string) {
  // Create a reference to the Firestore database
  const firestore = getFirestore();

  // Specify the collection where you want to add the document
  const collectionRef = collection(firestore, "todos_comments");

  // Define the data you want to add to the document
  const data = {
    id: id,
    name: name,
    user: user,
    role: role,
    message: message,
    date:Timestamp.fromMillis(Date.now()),
  };

  // Add the document to the collection
  const docRef = await addDoc(collectionRef, data);
  window.location.reload();
}

export async function getComment(id: string) {
  try {
    const firestore = getFirestore();

    // Create a query to retrieve the user document with the matching ID
    const usersCollection = collection(firestore, "todos_comments");
    const userQuery = query(usersCollection, where("id", "==", id));

    // Get the snapshot of the query result
    const snapshot = await getDocs(userQuery);

    console.info(snapshot)

    if (!snapshot.empty) {
      // Retrieve the first matching document
      const document = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { $id: doc.id, ...data };
      });

      return document;
    }
  } catch (error) {
    console.log(error);
  }
}


export async function delComment(id: string) {
  try {

    // Create a reference to the Firestore database
    const firestore = getFirestore();

    // Specify the collection where the comment is stored
    const collectionRef = collection(firestore, "todos_comments");

    // Specify the ID of the comment you want to delete
    const commentId = id;

    // Delete the comment document
    await deleteDoc(doc(collectionRef, commentId));

    // Reload the page or update the comment list
    window.location.reload();

  } catch (error) {
    console.log(error);
  }
}

export async function archiveComment(id: string) {
  // Create a reference to the Firestore database
  const firestore = getFirestore();

  const requestRef = doc(firestore, 'todos', id);

  const _data = {
    archive: true,
  };

  await updateDoc(requestRef, _data);

  // Reload the page or update the comment list
  window.location.reload();
}
