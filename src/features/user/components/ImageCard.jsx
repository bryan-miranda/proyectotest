import {
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const ImageCard = () => {
  return (
    <Grid>
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
          title="Imagen de Perfil"
        />
        <CardContent
          sx={{
            marginTop: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ width: "10rem", height: "10rem" }}>
            <AccountCircleIcon sx={{ width: "12rem", height: "12rem" }} />
          </Avatar>
          <Button sx={{ mb: 0, mt: 2 }} variant="contained" color="primary">
            Cambiar Imagen
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
