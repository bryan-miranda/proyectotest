import { Navigate } from 'react-router-dom'
import {ForgotPassword, Login, Register } from '../components'

export const AuthRoutes = [ 

    { path: 'login', element: <Login/>}, 

    { path: 'register', element: <Register/>},

    { path: 'forgot', element: <ForgotPassword/>},

    {path:'/auth/*', element: <Navigate to= {'/auth/login'}></Navigate>}

    
]