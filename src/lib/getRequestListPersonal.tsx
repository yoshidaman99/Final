import { getFirestore , query , getDocs , collection, where } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import Table from '@/app/components/UI/table';

function getUserIDFromArray(cookies: any): any {
  for (const key in cookies) {
    if (key === 'user' && cookies.hasOwnProperty(key)) {
      const user = cookies[key];
      if (user.hasOwnProperty('id')) {
        return user.id;
      }
    }
  }
  return null;
}


export const RequestList = async ( cookies : any ) => {
    try {

        const userID = getUserIDFromArray(cookies);

        initFirebase()
        const firestore = getFirestore();

        const newLocal = "todos";
        // Create a query to retrieve the user document with the matching ID
        const usersCollection = collection(firestore, newLocal);
        const userQuery = query(usersCollection, where('user', '==', userID ));

        // Get the snapshot of the query result
        const snapshot = await getDocs(userQuery);
        console.log(userID)
        if (!snapshot.empty) {
          // Retrieve the first matching document
          const document =  snapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data };
          });

          const columns: string[]  = ["title","type_Request","status"];
          console.log(userID)

          return (
            <Table textCaption='' tableColumns={columns} dataColumn={document} />
          );

        }

      } catch (error) {

        throw error;
      }
};