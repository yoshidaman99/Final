import { getFirestore, query, getDocs, collection, where } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import Table from '@/app/components/UI/table';

export async function getRequestList() {
  try {
    initFirebase();
    const firestore = getFirestore();

    const newLocal = "todos";
    // Create a query to retrieve the user document with the matching ID
    const usersCollection = collection(firestore, newLocal);
    const userQuery = query(usersCollection, where('archive', '==', false));

    // Get the snapshot of the query result
    const snapshot = await getDocs(userQuery);

    if (!snapshot.empty) {
      // Group requests by date and count the number of requests per day
      const requestsByDate: Record<string, number> = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const startDate = data.startDate?.toDate(); // Convert startDate to Date object
        const formattedDate = startDate?.toLocaleDateString();

        if (startDate) {
          if (requestsByDate[formattedDate]) {
            requestsByDate[formattedDate]++;
          } else {
            requestsByDate[formattedDate] = 1;
          }
        }
      });


      const document = Object.entries(requestsByDate).map(([date, count]) => ({
        Date: date,
        Request_Count: count,
      }));

      const columns: string[] = ["Date", "Request_Count"];

      return (
        <>
          <Table textCaption='' tableColumns={columns} dataColumn={document} />
        </>
      );

    }else{
      alert('error');
    }

  } catch (error) {
    alert('error2');
    throw error;
  }
}
