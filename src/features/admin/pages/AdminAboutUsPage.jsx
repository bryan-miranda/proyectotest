import { ThemeProvider } from '@emotion/react';
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Input, InputLabel, TextField } from '@mui/material'
import { useState } from 'react'
import { FaUpload } from 'react-icons/fa';
import { adminAboutTheme } from '../../../theme/theme';
import { useEffect } from 'react';
import { collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const AdminAboutUsPage = () => {
  const [aboutImage, setAboutImage] = useState(null);
  const [aboutImagePreview, setAboutImagePreview] = useState('https://placehold.jp/ffffff/ffffff/40x40.png');

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('https://placehold.jp/ffffff/ffffff/40x40.png');

  const [data, setData] = useState({});

  const handleAboutImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setAboutImage(selectedImage);
      const previewURL = URL.createObjectURL(selectedImage);
      setAboutImagePreview(previewURL);
    }
  };

  const handleLogoChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setLogo(selectedImage);
      const previewURL = URL.createObjectURL(selectedImage);
      setLogoPreview(previewURL);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    const db = getFirestore()
    var aboutRef = doc(db, 'aboutus', 'TjmbedS8qVSWv9sq6rZS')
    updateDoc(aboutRef, {
      description: data.description,
      email: data.email,
      facebook: data.facebook,
      instagram: data.instagram,
      name: data.name,
      phone: data.phone,
      youtube: data.youtube
    })

    if (data.aboutImage.name !== "")
      uploadFile(data.aboutImage, "About.png");
    if (data.logo.name !== "")
      uploadFile(data.logo, "Logo.png");

    toast.success("Información actualizada exitosamente.", {
      position: toast.POSITION.TOP_RIGHT,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const uploadFile = async (file, type) => {
    try {
      const storageRef = ref(storage, "images/" + type);
      await uploadBytes(storageRef, file);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "aboutus"));
      const data = querySnapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      ));
      setData(data[0]);
    }
    fetchData().catch(console.error);

    getDownloadURL(ref(storage, "images/About.png")).then((url) => {
      setAboutImagePreview(url);
    })
    getDownloadURL(ref(storage, "images/Logo.png")).then((url) => {
      setLogoPreview(url);
    })

  }, [])

  return (
    <ThemeProvider theme={adminAboutTheme}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={12} md={12} xl={12}>
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
              title="Informacion principal"
            />

            <CardContent sx={{ width: "max", height: "auto" }}>

              <Grid item sx={{ mb: 0, mt: 2 }}>
                <InputLabel htmlFor="companyName">Nombre de la empresa</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  id="name"
                  name="name"
                  defaultValue={data.name}
                />
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <InputLabel htmlFor="logo">Logotipo de la empresa</InputLabel>
                <Input
                  type="file"
                  accept="image/*"
                  id="logo"
                  name="logo"
                  style={{ display: 'none' }}
                  onChange={handleLogoChange}
                />
                {logoPreview && (
                  <div style={{ position: 'relative' }}>
                    <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    <label htmlFor="logo">
                      <IconButton style={{ position: 'absolute', top: 0, left: 0 }} component="span" sx={{ backgroundColor: "gray" }}>
                        <FaUpload color="black" />
                      </IconButton>
                    </label>

                  </div>
                )}
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <InputLabel htmlFor="description">Descripción</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={10}
                  id="description"
                  name="description"
                  defaultValue={data.description}
                />
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <InputLabel htmlFor="aboutImage">Imagen descriptiva</InputLabel>
                <Input
                  type="file"
                  accept="image/*"
                  id="aboutImage"
                  name="aboutImage"
                  style={{ display: 'none' }}
                  onChange={handleAboutImageChange}
                />
                {(
                  <div style={{ position: 'relative' }}>
                    <img src={aboutImagePreview} alt="About Preview" style={{ maxWidth: '100%' }} />
                    <label htmlFor="aboutImage" style={{ padding: '1%' }}>
                      <IconButton style={{ position: 'absolute', top: 0, left: 0 }} component="span" sx={{ backgroundColor: "gray" }}>
                        <FaUpload color="black" />
                      </IconButton>
                    </label>
                  </div>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid >
        <Grid item sx={{ mt: '15px' }} xs={12} sm={12} md={12} xl={12}>
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
              title="Redes sociales e información de contacto"
            />

            <CardContent sx={{ width: "max", height: "auto" }}>
              <Grid item sx={{ mt: 2 }}>
                <InputLabel htmlFor="companyName">Facebook</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  id="facebook"
                  name="facebook"
                  defaultValue={data.facebook}
                />
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <InputLabel htmlFor="companyName">Instagram</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  id="instagram"
                  name="instagram"
                  defaultValue={data.instagram}
                />
              </Grid>
              <Grid item sx={{ mb: 0, mt: 2 }}>
                <InputLabel htmlFor="companyName">Youtube</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  id="youtube"
                  name="youtube"
                  defaultValue={data.youtube}
                />
              </Grid>
              <Grid item sx={{ mb: 0, mt: 2 }}>
                <InputLabel htmlFor="companyName">Correo electrónico</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  id="email"
                  name="email"
                  defaultValue={data.email}
                />
              </Grid>
              <Grid item sx={{ mb: 0, mt: 2 }}>
                <InputLabel htmlFor="companyName">Número de telefono</InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  id="phone"
                  name="phone"
                  defaultValue={data.phone}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid >
        <Button
          sx={{ ml: 1, mt: 3 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Guardar
        </Button>
      </form>
    </ThemeProvider>
  )
}
