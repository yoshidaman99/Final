import {createUserWithEmailAndPassword,getAuth,} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';

export const signup = async (email: string, password: string, f_name: string, l_name:string,
    role: string, status: string, depart: string) =>{

    const auth = getAuth();

try{
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const user = userCredential.user;

if(user){
const id : string = user.uid;
const email : string  = user.email || '';

// Create a reference to the Firestore database
const firestore = getFirestore();

// Specify the collection where you want to add the document
const collectionRef = collection(firestore, "admins");

// Define the data you want to add to the document
const data = {
Email: email,
ID: id,
department: depart,
first_name: f_name,
last_name: l_name,
job_role: role,
status: status
// Add more fields as needed
};

// Add the document to the collection
const docRef = await addDoc(collectionRef, data);
window.location.reload();

}
}catch(error){
console.error(error);
}
}