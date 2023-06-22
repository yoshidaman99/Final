import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';

  export const sendEmail = async ( email: string, name : string, type : string, startDate : Date, endDate : Date ) => {

    // Create a reference to the Firestore database
    const firestore = getFirestore();
  
    // Specify the collection where you want to add the document
    const collectionRef = collection(firestore, "mail");
  
    // Define the data you want to add to the document
    const data = {
      to: email,
      message: {
        subject: 'Complete: ' + type,
        html: "Hi, " + name + " you're Request on " + startDate + " was completed at " + endDate + "<br/>" +
        "<br/>" +
        "<a href='https://main.d3jchgbt43z6u9.amplifyapp.com/login/student'>Link Here.</a>"
      },
    };
  
    // Add the document to the collection
    const docRef = await addDoc(collectionRef, data);
  
  };
