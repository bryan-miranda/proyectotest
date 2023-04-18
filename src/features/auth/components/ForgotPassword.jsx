import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import {  NavLink, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../firebase/authProviders";

import { AuthLayout } from "../layout/AuthLayout";
import { toast } from 'react-toastify';
export const ForgotPassword = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = (data) => {
    forgotPassword({ email: data.email});
    toast.success('"¡Listo! Hemos enviado un correo electrónico con las instrucciones para recuperar tu contraseña!', {position: toast.POSITION.TOP_RIGHT});
    navigate("/auth/login");
  };



  return (
    <AuthLayout title="Recuperar Contrasena">
      <form onSubmit={handleSubmit(onSubmit)}  >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              fullWidth
              name="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
              >
                Recuperar
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <NavLink to="/auth/login">Iniciar sesion</NavLink>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
