import {
    getAuth,
    UserCredential,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
  import {
    getFirestore,
    query,
    where,
    getDocs,
    collection,
  } from 'firebase/firestore';
  import Cookies from 'universal-cookie';
  
  const cookie = new Cookies();
  
  const navigateToAddress = (address:string) => {
      window.location.href = address;
    };
  
  export const login  = async (email: string, password: string) => {
  
      const auth = getAuth();
  
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        if (user) {
          const id: string = user.uid;
          const userEmail: string = user.email || '';
  
          // Get a reference to the Firestore database
          const firestore = getFirestore();
  
          // Create a query to retrieve the user document with the matching ID
          const usersCollection = collection(firestore, "students");
          const userQuery = query(usersCollection, where("ID", "==", id));
  
          // Get the snapshot of the query result
          const snapshot = await getDocs(userQuery);
  
          if (!snapshot.empty) {
            
            const userData = { id: id, email: userEmail, name: name, role: 'student' };
  
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 10000000);
              // Save the user data to the cookie
            cookie.set('user', JSON.stringify(userData), { expires: expirationDate  });
            //localStorage.setItem('user', JSON.stringify(userData));
  
            navigateToAddress('/dashboard');
          }else{
            await signOut(auth);
            cookie.remove('user');
            navigateToAddress('/');
          }
        }
      } catch (error) {
        console.log(error);
        return "Invalid email or password";
        
      }
  }