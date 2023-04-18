import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Grid  } from "@mui/material";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

const TrainerCreateDialog = (props) => {
  const { onClose, open, onCreate} = props;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [formError, setFormError] = useState(false);

  const handleClose = () => onClose();
  const handleNameChange = (event) =>  setName(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePhotoChange = (event) => setPhoto(event.target.value);
  const handleBioChange = (event) => setBio(event.target.value);

  const handleCreate = async () => {
    const db = getFirestore();
    const collectionRef = collection(db, 'profesores');
    try {
      const trainer = {
        Nombre: name,
        Categoria: category,
        Foto: photo,
        Biografia: bio
      }
      const docRef = await addDoc(collectionRef, trainer);
      trainer.id = docRef.id;
      onCreate(trainer);
      toast.success('¡Se agregó al profesor exitosamente!', {position: toast.POSITION.TOP_RIGHT});
    }
    catch (error) {
      toast.error('¡Error al agregar al profesor!', {position: toast.POSITION.TOP_RIGHT});
    }
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === '' || photo === '' || category === '' || bio === '') {
      setFormError(true);
      return;
    }
    handleCreate();
    setFormError(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Creación de profesor</DialogTitle>
      <DialogContent>Ingrese a continuación los datos del nuevo profesor.</DialogContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nombre" value={name} onChange={handleNameChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Categoria" value={category} onChange={handleCategoryChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Foto" value={photo} onChange={handlePhotoChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Biografía" value={bio} onChange={handleBioChange}/>
          </Grid>
          {formError && (<Grid item xs={12} justifyContent="flex-end"><p style={{ color: 'red' }}>Llene todos los formularios.</p></Grid>)}
          <Grid item xs={12} justifyContent="flex-end">
            <DialogActions>
              <Button onClick={handleClose}>Cerrar</Button>
              <Button type="submit" variant="contained" color="primary">Guardar</Button>
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
export default TrainerCreateDialog;