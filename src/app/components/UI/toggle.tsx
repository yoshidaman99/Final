import React, { useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { initFirebase } from '@/firebase/firebaseApp';

initFirebase();

const ToggleButton = () => {
    const [isToggledOn, setIsToggledOn] = useState(false);
  
    const handleToggle = async () => {
      if (isToggledOn) {
        // Delete data from Firebase
        try {
          // Your code to delete data from Firebase goes here
          console.log('Data deleted successfully');
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      } else {
        // Log in to Firebase
        try {
          // Your code to log in to Firebase goes here
          console.log('Logged in to Firebase');
        } catch (error) {
          console.error('Error logging in to Firebase:', error);
        }
      }
  
      setIsToggledOn(!isToggledOn);
    };
  
    return (
      <button onClick={handleToggle} className="flex items-center text-xl focus:outline-none">
        {isToggledOn ? <FaToggleOn /> : <FaToggleOff />}
        <span className="ml-2">{isToggledOn ? 'Toggle Off' : 'Toggle On'}</span>
      </button>
    );
  };
