import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { initFirebase } from '@/firebase/firebaseApp';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';


initFirebase();

const app = initFirebase();
export const db = getFirestore(app);


const chatStatusDocId = '1k58YKyW2TQBnPLFACx7';
const chatStatusDocRef = doc(db, 'chat_status', chatStatusDocId);

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const fetchChatStatus = async () => {
      try {
        const chatStatusDocSnapshot = await getDoc(chatStatusDocRef);
        const enable = chatStatusDocSnapshot.data()?.enable;
        setIsOn(enable);
      } catch (error) {
        console.log('Error fetching chat status:', error);
      }
    };

    fetchChatStatus();
  }, []);

  const handleToggle = async () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    updateChatStatus(newIsOn);
  };

  const updateChatStatus = async (enable: boolean) => {
    try {
      await updateDoc(chatStatusDocRef, { enable });
      console.log('Chat status updated successfully!');
    } catch (error) {
      console.log('Error updating chat status:', error);
    }
  };

  return (
    <div>
      <button onClick={handleToggle} className="toggle-button">
        {isOn ? <FaToggleOn /> : <FaToggleOff />}
      </button>
      <span>{isOn ? 'On' : 'Off'}</span>
    </div>
  );
};

export default Toggle;