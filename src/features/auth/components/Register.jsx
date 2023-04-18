import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { startCreatingUserWithEmailPassword } from "../../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";



export const Register = () => {
  
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { status, errorMessage } = useSelector(state => state.auth)

  const isCheckingAuthentication = useMemo ( () => status === 'checking', 
   [status]
  )

  const onSubmit = (data) => {
    dispatch(startCreatingUserWithEmailPassword(data))
  }



  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            type="text"
            fullWidth
            name="displayName"
            {...register("displayName", { required: true })}
          />
          {errors.displayName && <span>This field is required</span>}
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Telefono"
            type="number"
            fullWidth
            {...register("phone", { required: true })}
          />
          {errors.phone && <span>This field is required</span>}
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField label="Correo" type="email" fullWidth name="email" 
          
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

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          
        <Grid item xs={12} sx={{ display: errorMessage ? "block" : "none", mt: 1 }}>
              <Alert
                severity="error"
              >{errorMessage}
              </Alert>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              disabled = {isCheckingAuthentication}
              variant="contained"
              fullWidth
              type="submit"
            >
              Crear cuenta
            </Button>
          </Grid>

        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
          <NavLink to="/auth/login">Ingresa</NavLink>
        </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
