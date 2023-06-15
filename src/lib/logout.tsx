import {
    signOut,
    getAuth,
} from 'firebase/auth';
import Cookies from 'universal-cookie';
import { initFirebase } from '@/firebase/firebaseApp';

initFirebase();
const auth = getAuth();
const cookie = new Cookies();

const navigateToAddress = (address:string) => {
    window.location.href = address;
  };

export const logout = async () =>{
    try{
        await signOut(auth);
        cookie.remove('user');
        navigateToAddress('/');
    }catch(error){
        console.error(error);
    }
}