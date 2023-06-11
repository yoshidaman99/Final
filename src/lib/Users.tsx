'use client'
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { initFirebase } from '@/firebase/firebaseApp';
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
} from 'firebase/firestore';
import Cookies from 'universal-cookie';


export interface UserState {
  user: { name: string; id: string; email: string; role?: string } | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void | string>;
  loginID: (email: string, password: string) => Promise<string | 0>;
  signup: (
    email: string,
    password: string,
    f_name: string,
    l_name: string,
    role: string,
    status: string,
    depart: string
  ) => Promise<void>;
  addRequest: (title: string, message: string, requestList: string, role: string) => Promise<void>;
  getUserName: (id: string) => Promise<void | string>;
  addComment: (id: string, user: string, message:string, name: string, role: string) => Promise<void>;
  getComment: ( id : string )=> Promise<any>;
  delComment: ( id : string )=> Promise<any>;
  archiveComment: ( id : string )=> Promise<any>;
}

const defaultState: UserState = {
  user: null,
  loading: true,
  logout: async () => {},
  login: async () => {},
  loginID: async () => '',
  signup: async () => {},
  addRequest: async () => {},
  getUserName: async () => {},
  addComment: async () => {},
  getComment: async () => {},
  delComment: async () => {},
  archiveComment: async () => {},
};

const UserContext = createContext<UserState>(defaultState);
const cookie = new Cookies();

export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<null | { id: string; email: string; name: string; role?: string }>(
      null
    );
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth();
    const app = initFirebase();

  const login  = async (email: string, password: string) => {
    try {
      console.log(auth);
      console.log(password);
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("sdasdas");

      if (user) {
        const id: string = user.uid;
        const name: string = user.displayName || '';
        const userEmail: string = user.email || '';

        // Get a reference to the Firestore database
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
          const job_role = document.job_role;

          const userData = { id: id, email: userEmail, name: name, role: job_role };

          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 5);
            // Save the user data to the cookie
            cookie.set('user', JSON.stringify(userData), { expires: expirationDate  });
          // Alternatively, you can use localStorage.setItem('user', JSON.stringify(userData));

          setUser(userData);
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.log(error);
      return "Invalid email or password";
      
    }
  }

      const loginID = async (email : string, password : string)=>{
        
        try{
          
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if(user){
                //return the $id of the account
                return user.uid;;
            }

        }catch(error){
            console.error(error);
        }
        return 0;
      }

      const logout = async () =>{
        try{

            await signOut(auth);
            cookie.remove('user');
        }catch(error){
            console.error(error);
        }
      }

    const signup = async (email: string, password: string, f_name: string, l_name:string,
                            role: string, status: string, depart: string) =>{
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

      const getUserName = async (id: string) => {
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
      };

      const addComment = async (id: string, user: string, message:string, name: string, role: string) => {
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
            date: Date.now(),
        };

        // Add the document to the collection
        const docRef = await addDoc(collectionRef, data);
        window.location.reload();
      }

      const addRequest = async ( title: string, message: string, requestList: string, role: string ) => {
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
        router.push('/dashboard/Requests/task-query');
     }

     const getComment = async ( id : string ) => {
        try {
            const firestore = getFirestore();

            // Create a query to retrieve the user document with the matching ID
            const usersCollection = collection(firestore, "todos_comments");
            const userQuery = query(usersCollection, where("id", "==", id));

            // Get the snapshot of the query result
            const snapshot = await getDocs(userQuery);

            if (!snapshot.empty) {
               // Retrieve the first matching document
                const document = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { $id: doc.id, ...data };
                  });

               console.log(document);
              return document;
            }
        }catch (error){
            console.log(error)
        }
     }

     const delComment = async ( id : string ) => {
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

        }catch (error){
            console.log(error)
        }
     }

     const archiveComment = async (id : string ) => {
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

    return(
        <UserContext.Provider value={{ user, login,loading, loginID, logout, signup, addRequest, getUserName, addComment, getComment, delComment, archiveComment }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
