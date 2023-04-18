import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { FirebaseAuth, FirebaseDB } from "./config";

const googleProvider = new GoogleAuthProvider();

const actionCodeSettings = {
  // After password reset, the user will be give the ability to go back
  // to this page.
  url: "http://localhost:3000/auth/login",
  handleCodeInApp: false,
};

export const signInWithGoogle = async () => {
  try {
    // Auth y Proveedor(google, twitter, etc)
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // get token, google credentials...
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    // check if user already exists
    const docRef = await (await getDoc(doc(FirebaseDB, "users", uid))).exists();
    if (docRef) {
      const getUser = await getDoc(doc(FirebaseDB, "users", uid));
      const {
        rol: newRol,
        email: newEmail,
        phone: newPhone,
        displayName: newDisplayName,
        photoURL: newPhotoURL, 
        blocked: newBlocked
      } = getUser.data();

      if(newBlocked){ 
        console.log("error");
        toast.error('Usuario bloqueado, contacte al administrador', {position: toast.POSITION.TOP_RIGHT});
        return {
          ok: false,
          errorMessage: "Usuario bloqueado"
        };
      }
      return {
        ok: true,
        rol: newRol,
        email: newEmail,
        phone: newPhone,
        displayName: newDisplayName,
        photoURL: newPhotoURL,
        uid,
        blocked: newBlocked
      };
    }

    await setDoc(doc(FirebaseDB, "users", uid), {
      displayName,
      email,
      photoURL,
      uid,
      rol: "user",
      phone: null,
      blocked: false
    });

    return {
      ok: true,
      rol: "user",
      phone: null,
      blocked: false,
      displayName,
      photoURL,
      uid,
      email,
    };
  } catch (error) {
    const errorMessage = error.message;
    console.log("error");
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  displayName,
  email,
  phone,
  password,
}) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = result.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    // todo: add more info into the user document or create a new collection
    await setDoc(doc(FirebaseDB, "users", uid), {
        displayName,
        email,
        phone,
        photoURL,
        uid,
        rol: "user",
        blocked: false,
    });

    return {
      ok: true,
      rol: "user",
      blocked: false,
      phone,
      displayName,
      photoURL,
      uid,
      email,
    };
  } catch (error) {
    const errorCode = error.code;

    const errorMessage =
      errorCode === "auth/email-already-in-use"
        ? "El correo ya está registrado"
        : error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid } = result.user;

    const docRef = await (await getDoc(doc(FirebaseDB, "users", uid))).exists();
    if (docRef) {
      const getUser = await getDoc(doc(FirebaseDB, "users", uid));
      const {
        rol: newRol,
        email: newEmail,
        phone: newPhone,
        displayName: newDisplayName,
        photoURL: newPhotoURL,
        blocked: newBlocked
      } = getUser.data();

      if(newBlocked){ 
        console.log("error");
        toast.error('Usuario bloqueado, contacte al administrador', {position: toast.POSITION.TOP_RIGHT});
        return {
          ok: false,
          errorMessage: "Usuario bloqueado"
        };
      }

      return {
        ok: true,
        rol: newRol,
        email: newEmail,
        phone: newPhone,
        displayName: newDisplayName,
        photoURL: newPhotoURL,
        uid,
        blocked: newBlocked
      };
    }

    else{ 
      return {
        ok: false,
        errorMessage: "No se encontró el usuario",
      };
    }
  } catch (error) {
    const errorCode = error.code;

    const errorMessage =
      errorCode === "auth/user-not-found"
        ? "Usuario no encontrado"
        : error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const updateuserprofile = async (user) => {
  const curUser = FirebaseAuth.currentUser;


  await updateDoc(doc(FirebaseDB, "users", curUser.uid), user);

};

export const editPassword = async ({ newPassword, currentPassword }) => {
  const currentUser = FirebaseAuth.currentUser;

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    currentPassword
  );
  try {
    await  reauthenticateWithCredential(currentUser, credential);
  } catch (error) {
    console.log("Error al reautenticar el usuario", error);
    return;
  }

  try {
    await updatePassword(currentUser, newPassword);
    console.log("La contraseña se ha actualizado correctamente");
  } catch (error) {
    console.log("Error al actualizar la contraseña", error);
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

export const forgotPassword = async (email) => {
  return await sendPasswordResetEmail(FirebaseAuth, email.email, actionCodeSettings); 

};
