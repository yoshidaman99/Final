import {
  getAuth,
  UserCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';
import Cookies from 'universal-cookie';

const navigateToAddress = (address:string) => {
    window.location.href = address;
  };

export const login  = async (email: string, password: string) => {

    const cookie = new Cookies();
    const auth = getAuth();

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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

          navigateToAddress('/dashboard');
        }
      }
    } catch (error) {
      console.log(error);
      return "Invalid email or password";
      
    }
}