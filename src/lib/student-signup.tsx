import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
  } from 'firebase/auth';
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  import { initFirebase  } from '@/firebase/firebaseApp';
  
  export const signup = async (
    email: string,
    password: string,
    fName: string,
    lName: string,
    course: string,
    year: string
  ) => {
    initFirebase();
    const auth = getAuth();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: fName + ' ' + lName,
      });
      const user = userCredential.user;
  
      if (user) {
        const id: string = user.uid;
        const userEmail: string = user.email || '';
  
        // Create a reference to the Firestore database
        const firestore = getFirestore();
  
        // Specify the collection where you want to add the document
        const collectionRef = collection(firestore, 'students');
  
        // Define the data you want to add to the document
        const data = {
          Email: userEmail,
          ID: id,
          first_name: fName,
          last_name: lName,
          course: course,
          year: year,
          // Add more fields as needed
        };

        // Add the document to the collection
        const docRef = await addDoc(collectionRef, data);
      }
    } catch (error) {
      console.error(error);
      return 1;
    }
  };