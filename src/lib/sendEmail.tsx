import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';

  interface MessageDate {
    seconds: number;
    nanoseconds: number;
  }
  

  export const sendEmail = async ( email: string, name : string, type : string, startDate : MessageDate, endDate : MessageDate ) => {

    let startDay;
    let endDay;

    const timestamp = {
      seconds : startDate.seconds,
      nanoseconds : startDate.nanoseconds,
    }

    if (timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
    const dateObject = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    startDay = dateObject.toLocaleString();
    }   

    const timestamp2 = {
      seconds : endDate.seconds,
      nanoseconds : endDate.nanoseconds,
    }


    if (timestamp2.seconds !== undefined && timestamp2.nanoseconds !== undefined) {
    const dateObject = new Date(
      timestamp2.seconds * 1000 + timestamp2.nanoseconds / 1000000
    );
    endDay = dateObject.toLocaleString();
    }   

    // Create a reference to the Firestore database
    const firestore = getFirestore();
  
    // Specify the collection where you want to add the document
    const collectionRef = collection(firestore, "mail");
  
    // Define the data you want to add to the document
    const data = {
      to: email,
      message: {
        subject: 'Complete: ' + type,
        html: "Hi, " + name + " you're Request on " + startDay + " was completed at " + endDay + "<br/>" +
        "<br/>" +
        "<a href='https://main.d3jchgbt43z6u9.amplifyapp.com/login/student'>Link Here.</a>"
      },
    };
  
    // Add the document to the collection
    const docRef = await addDoc(collectionRef, data);
  
  };
