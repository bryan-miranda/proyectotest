import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { ImageCard, InfoCard, PasswordCard } from "./components";

export const UserProfile = () => {
  return (
    <Container>
    <Grid
      sx={{
        mt:10,
        mb:10
      }}
      container
      rowSpacing={1}
      columnSpacing={{ md: 1, xl: 2, length: 2 }}
      maxWidth="lg"
    >
      <Grid item sm={12} md={3}>
        <ImageCard />
      </Grid>
      <Grid item rowSpacing={1} sm={12} md={9}>
        <Grid container rowSpacing={1} maxWidth="lg">
          <InfoCard />
          <PasswordCard />
        </Grid>
      </Grid>
    </Grid>
    </Container>
  );
};
