import { getFirestore, query, getDocs, collection, where } from 'firebase/firestore';
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
        const startDate = data.startDate?.toDate(); // Convert startDate to Date object
        const endDate = data.completedAt?.toDate(); // Convert endDate to Date object
        const totalDays = calculateTotalDays(startDate, endDate); // Calculate total days

        return {
          ...data,
          startDate: startDate?.toLocaleDateString(), // Convert startDate to formatted string
          endDate: endDate?.toLocaleDateString(), // Convert endDate to formatted string
          totalDays,
        };
      });

      const columns: string[] = ["id", "title", "status", "type_Request", "role", "user", "startDate", "endDate", "totalDays"];

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

function calculateTotalDays(startDate: Date | undefined, endDate: Date | undefined): number {
  if (startDate && endDate) {
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays;
  }
  return 0;
}