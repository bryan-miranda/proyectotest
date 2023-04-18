import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import {startUpdatePassword} from "../../../store/auth/thunks"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const PasswordCard = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (
      data.newPassword === data.confirmPassword 
    ) {
      dispatch(startUpdatePassword(data));
    }
  };

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
          title="Cambiar Contraseña"
        />
        <CardContent sx={{ width: "10max", height: "20rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item sx={{ mb: 0, mt: 2 }}>
              <InputLabel htmlFor="inputCurrentpassword">
                Contraseña Actual
              </InputLabel>

              <TextField
                type={"password"}
                {...register("currentPassword")}
                variant="outlined"
                size="small"
                fullWidth
                id="inputCurrentpassword"
                placeholder="Escribe tu contraseña actual"
              />
            </Grid>
            <Grid item sx={{ mb: 0, mt: 2 }}>
              <InputLabel htmlFor="inputNewpassword">
                Nueva Contraseña
              </InputLabel>

              <TextField
                type={"password"}
                {...register("newPassword")}
                variant="outlined"
                size="small"
                fullWidth
                id="inputNewpassword"
                placeholder="Escribe tu nueva contraseña"
              />
            </Grid>
            <Grid item sx={{ mb: 0, mt: 2 }}>
              <InputLabel htmlFor="inputConfirmpassword">
                Confirmar Contraseña
              </InputLabel>

              <TextField
                type={"password"}
                {...register("confirmPassword")}
                variant="outlined"
                size="small"
                fullWidth
                id="inputConfirmPassword"
                placeholder="Confirma tu nueva contraseña"
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
