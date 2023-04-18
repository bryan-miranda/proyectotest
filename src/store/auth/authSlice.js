import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
      status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
      rol: 'guest', // 'guest', 'user', 'admin'
      uid: null,
      email: null,
      phone: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
      blocked: false
  },
  reducers: {
      login: ( state, { payload } ) => {
          state.status = 'authenticated'; // 'checking', 'not-authenticated', 'authenticated'
          state.rol  = payload.rol; // 'guest', 'user', 'admin'
          state.uid = payload.uid;
          state.email = payload.email;
          state.phone = payload.phone;
          state.displayName = payload.displayName;
          state.photoURL = payload.photoURL;
          state.errorMessage = null;
          state.blocked = payload.blocked;
      },
      logout: ( state, { payload } ) => {
          state.status = 'not-authenticated'; // 'checking', 'not-authenticated', 'authenticated'
          state.rol  = 'guest'; // 'guest', 'user', 'admin'
          state.uid = null;
          state.email = null;
          state.phone = null;
          state.displayName = null;
          state.photoURL = null;
          state.errorMessage = payload?.errorMessage;
          state.blocked = null;
      },

    //  on auth process -> async process, prevent double posts
      checkingCredentials: (state) => {
          state.status = 'checking';
      }, 

      editProfile: (state, {payload}) => {
    
        if (state !== payload) {
          if (!!payload.displayName !== false) {
            state.displayName = payload.displayName;
          }
          if (!!payload.email !== false) {
            state.email = payload.email;
          }
          if (!!payload.phone !== false) {
            state.phone = payload.phone;
          }
          if (!!payload.status !== false) {
            state.status = payload.status;
          }
          if (!!payload.rol !== false) {
            state.rol = payload.rol;
          }
          if (!!payload.uid !== false) {
            state.uid = payload.uid;
          }
          if (!!payload.photoURL !== false) {
            state.photoURL = payload.photoURL;
          }
          if (!!payload.errorMessage !== false) {
            state.errorMessage = payload.errorMessage;
          }
        }
      },
      
  }
});


// functions asociated to reducer
export const { editProfile, editPassword,login, logout, checkingCredentials } = authSlice.actions;