import { getFirestore, query, getDocs, collection, where } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import { createChat } from '@/lib/addRequestChatGroup';

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

export const RequestList = async (cookies: any) => {
  try {
    const userID = getUserIDFromArray(cookies);

    initFirebase();
    const firestore = getFirestore();

    const collectionName = "todos";
    // Create a query to retrieve the user documents with the matching user ID
    const usersCollection = collection(firestore, collectionName);
    const userQuery = query(usersCollection, where('user', '==', userID));

    // Get the snapshot of the query result
    const snapshot = await getDocs(userQuery);

    if (!snapshot.empty) {
      // Retrieve the matching documents
      const documents = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data };
      });

      const columns: string[] = ["title", "message", "status", "Action"];

      const handleAction = (id: string) => {
        // Implement your action logic here
        createChat(id);
        console.log(`Perform action for document with ID: ${id}`);
      };

      return (
        <table className="border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} className="border border-gray-300 py-2 px-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="border border-gray-300 py-2 px-4">{document.title}</td>
                <td className="border border-gray-300 py-2 px-4">{document.message}</td>
                <td className="border border-gray-300 py-2 px-4">{document.status}</td>
                <td className="border border-gray-300 py-2 px-4">
                  <button
                    onClick={() => handleAction(document.id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded
                     hover:bg-lime-800"
                  >
                    Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  } catch (error) {
    throw error;
  }
};