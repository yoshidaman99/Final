import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';

  export const sendEmail = async ( email: string ) => {

    // Create a reference to the Firestore database
    const firestore = getFirestore();
  
    // Specify the collection where you want to add the document
    const collectionRef = collection(firestore, "mail");
  
    // Define the data you want to add to the document
    const data = {
      to: email,
      message: {
        subject: 'Request Docs',
        html: 'Your request has been completed!'
      },
    };
  
    // Add the document to the collection
    const docRef = await addDoc(collectionRef, data);
  
  };
