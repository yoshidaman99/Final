import { getAuth, updatePassword } from 'firebase/auth';
import { initFirebase  } from '@/firebase/firebaseApp';
export const updatingPassword = async (password: string) =>{

try{
// Assuming you already have a user signed in
const app = initFirebase();
const auth = getAuth();
const user = auth.currentUser;

// Change the user's password
const changePassword = async (password1:string) => {
    try {
    if(user)
      await updatePassword(user, password1);
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Error changing password', error);
    }
  };
  
  // Example usage
  changePassword(password);
}catch(error){
    console.error(error);
    return 1;
}
}