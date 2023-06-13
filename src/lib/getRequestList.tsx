import { getFirestore , query , getDocs , collection, where } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import Table from '@/app/components/UI/table';

export async function getRequestList() {
  try {
    const app = initFirebase();
    const firestore = getFirestore();

    const newLocal = "todos";
    // Create a query to retrieve the user document with the matching ID
    const usersCollection = collection(firestore, newLocal);
    const userQuery = query(usersCollection, where('archive', '==', false));

    // Get the snapshot of the query result
    const snapshot = await getDocs(userQuery);

    if (!snapshot.empty) {
      // Retrieve the first matching document
      const document = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data };
      });

      const columns: string[] = ["id", "title", "status", "type_Request", "role", "user", "name"];

      return (
        <>

          <Table textCaption='' tableColumns={columns} dataColumn={document} />

        </>
      );

    }

  } catch (error) {

    throw error;
  }
}