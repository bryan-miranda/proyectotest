import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import {startUpdateUserProfile} from "../../../store/auth/thunks"

export const InfoCard = () => {

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => dispatch(startUpdateUserProfile(data));

  return (
    <Grid item sm={12} md={12}>
      <Card
        sx={{
          boxShadow: "0 0.15rem 2rem 0 rgb(33 40 50 / 15%)",
          fontWeight: 500,
        }}
      >
        <CardHeader
          sx={{
            color: "#69707a",
            padding: "1rem 1.35rem",
            marginBottom: 0,
            backgroundColor: "rgba(33, 40, 50, 0.03)",
            borderBottom: "1px solid rgba(33, 40, 50, 0.125)",
            borderradius: "0.35rem 0.35rem 0 0",
            fontWeight: 500,
          }}
          title="Informacion del Perfil"
        />

        <CardContent sx={{ width: "max", height: "20rem" }}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item sx={{ mb: 0, mt: 2 }}>
              <InputLabel htmlFor="inputUsername">Nombre</InputLabel>

              <TextField
                defaultValue={auth.displayName}
                {...register("displayName")}
                variant="outlined"
                size="small"
                fullWidth
                id="inputUsername"
                placeholder="Escribe un nombre"
              />
            </Grid>
            <Grid item sx={{ mb: 0, mt: 2 }}>
              <InputLabel htmlFor="inputEmail">Email</InputLabel>

              <TextField
                // {...register("email")}

                variant="outlined"
                disabled
                type="email"
                defaultValue={auth.email}
                size="small"
                fullWidth
                id="inputEmail"
              />
            </Grid>
            <Grid item sx={{ mb: 0, mt: 2 }}>
              <InputLabel htmlFor="inputNumber">Numero de Telefono</InputLabel>

              <TextField
                defaultValue={auth.phone}
                {...register("phone")}
                type="tel"
                variant="outlined"
                size="small"
                fullWidth
                id="inputNumber"
                placeholder="Escribe un Numero"
              />
            </Grid>
            <Button
              sx={{ mb: 0, mt: 2 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};
