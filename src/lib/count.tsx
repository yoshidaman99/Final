
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/firebaseApp';

export async function countUnviewedNotifications(uid : string) {
  // Specify the collection where the notifications are stored
  const collectionRef = collection(db, "notification");

  // Create a query to fetch the notifications with view set to false for the given uid
  const q = query(collectionRef, where("id", "==", uid), where("view", "==", false));

  // Execute the query and get the snapshot of the matching documents
  const querySnapshot = await getDocs(q);

  // Return the number of unviewed notifications as a number
  return querySnapshot.size;
}