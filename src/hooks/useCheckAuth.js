import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth, FirebaseDB } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';

export const useCheckAuth = () => {
  const {status} = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user) => {
      
        // !! await need it
        if(!user) return dispatch(logout())

        const docRef = await (await getDoc(doc(FirebaseDB, "users", user.uid))).exists();
        if (docRef) {
          const getUser = await getDoc(doc(FirebaseDB, "users", user.uid));
          const {
            rol: newRol,
            email: newEmail,
            phone: newPhone,
            displayName: newDisplayName,
            photoURL: newPhotoURL,
            blocked: newBlocked
          } = getUser.data();

          if(newBlocked) return dispatch(logout())

          dispatch( login({ uid: user.uid, rol: newRol, email: newEmail, phone: newPhone, displayName: newDisplayName, photoURL: newPhotoURL, blocked: newBlocked }) );
        } else {
          dispatch(logout())
        }
    })
  }, [dispatch])
  console.log(status)
  return {
    status
    
  }
}
