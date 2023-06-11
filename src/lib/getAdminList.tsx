import { getFirestore , query , getDocs , collection, where } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import Table from '@/app/components/UI/table';

export const getAdminList = async () => {
    try {
        const app = initFirebase();
        const firestore = getFirestore();

        const newLocal = "admins";
        // Create a query to retrieve the user document with the matching ID
        const usersCollection = collection(firestore, newLocal);
        const userQuery = query(usersCollection, where('status', '==', 'active'));

        // Get the snapshot of the query result
        const snapshot = await getDocs(userQuery);

        if (!snapshot.empty) {
          // Retrieve the first matching document
          const document =  snapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data };
          });

          const columns: string[]  = ["Email", "ID", "department", "first_name", "last_name","job_role"];

          return (
            <>
            
            <Table textCaption='' tableColumns={columns} dataColumn={document} />

            </>
          );

        }

      } catch (error) {

        throw error;
      }
};