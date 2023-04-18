
import {updateuserprofile, editPassword,loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/authProviders";
import { editProfile, checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = () => { 
    return async(dispatch) => { 
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => { 
    return async(dispatch) => { 
        dispatch(checkingCredentials());

        const result = await signInWithGoogle()
        if ( !result.ok) return dispatch(logout(result.errorMessage) ) 

        dispatch(login(result))

    }
}

export const startCreatingUserWithEmailPassword = ({displayName, email, phone, password}) => { 
    return async(dispatch) => { 
        dispatch(checkingCredentials ()); 

        const {ok, uid, photoURL, errorMessage, blocked, rol} = await registerUserWithEmailPassword({displayName, email, phone, password})
        
        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, phone, photoURL, blocked, rol}))

    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, rol, uid, displayName, photoURL, errorMessage, phone, blocked} = await loginWithEmailPassword({email, password})

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email,rol, phone, photoURL, blocked}))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}

export const startUpdateUserProfile = (user) =>{
    return async(dispatch) =>{
        dispatch(editProfile(user));
        
        await updateuserprofile(user);

    }
} 
export const startUpdatePassword = (user) =>{
    return async() =>{
        
        await editPassword(user);

    }
} 


