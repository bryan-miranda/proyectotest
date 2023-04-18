import { Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Alert } from "@mui/material";
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../store/auth/thunks";

export const Login = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // get state from store
  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  // memorize state to avoid re-render
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (data) => {
    dispatch(startLoginWithEmailPassword({email:data.email, password: data.password}))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
    
  };

  return (
    <AuthLayout title="Iniciar sesion">
      <form onSubmit={ handleSubmit(onSubmit)}>
        {/* Form */}
        <Grid container>
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              fullWidth  
              {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              name="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <NavLink to="/auth/forgot">Recupera tu contrasena </NavLink>
          </Grid>

          <Grid item xs={12} sx={{ display: errorMessage ? "block" : "none", mt: 1 }}>
              <Alert
                severity="error"
              >{errorMessage}
              </Alert>
          </Grid>

          {/* Buttons */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          {/* Register */}
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>No tienes cuenta?</Typography>
            <NavLink to="/auth/register">Registrate</NavLink>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  );
};
