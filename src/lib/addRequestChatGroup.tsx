import {
    getAuth,
  } from 'firebase/auth';
  import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    doc,
    Timestamp,
    getDocs,
    query,
    where,
  } from 'firebase/firestore';
  
  const navigateToAddress = (address:string) => {
      window.location.href = address;
    };
  
  export const createChat = async ( requestId : string ) => {
      // Create a reference to the Firestore database
      const firestore = getFirestore();
  
      // Specify the collection where you want to add the document
      const collectionRef = collection(firestore, "admin_chat");

        // Create a query to check if a document with the same requestId exists
        const querySnapshot = await getDocs(query(collectionRef, where("requestId", "==", requestId)));

        if (!querySnapshot.empty) {
          // If a document with the same requestId exists, navigate to the desired direction
          navigateToAddress("/dashboard/chat?id=" + requestId);
          return; // Exit the function to avoid creating a new chat document
        }
        
      const auth = getAuth();
      const usersCurrent = auth.currentUser;
  
      const $id = usersCurrent?.uid;
  
       // Define the data you want to add to the document
       const data = {
          id: collectionRef.id,
          user: $id,
          name: usersCurrent?.displayName,
          archive: false,
          priority: 1,
          requestId: requestId,
          update: Timestamp.fromMillis(Date.now()),
      };
  
      // Add the document to the collection
      const docRef = await addDoc(collectionRef, data);
  
      const _id = docRef.id;
      const requestRef = doc(firestore, 'admin_chat', _id);
  
      const _data = {
          id: _id,
      };
  
      await updateDoc(requestRef, _data);
  
      // Create a reference to the child collection
      const childCollectionRef = collection(doc(collectionRef, docRef.id), "Chatlog");


      // Add a new document to the child collection
      const base = await addDoc(childCollectionRef, {
        user: 'system',
        name: 'System',
        message: 'Welcome to are admin chat. wait for admin to answer.',
        date: Timestamp.fromMillis(Date.now()),
      });
  
      navigateToAddress('/dashboard/chat?id=' + requestId);
   }