import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Grid  } from "@mui/material";
import { getFirestore, setDoc , doc } from "firebase/firestore";
import { toast } from 'react-toastify';

const TrainerEditViewDialog = (props) => {
  const { onClose, open, object, onUpdate, flagView} = props;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    if (object && object.object) {
      setName(object.object.Nombre);
      setCategory(object.object.Categoria);
      setPhoto(object.object.Foto);
      setBio(object.object.Biografia);
    }
  }, [object]);

  const handleClose = () => onClose();
  const handleNameChange = (event) =>  setName(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePhotoChange = (event) => setPhoto(event.target.value);
  const handleBioChange = (event) => setBio(event.target.value);

  const handleUpdate = async () => {
    const db = getFirestore();
		const collectionRef = doc(db, 'profesores', object.object.id);
    try {
      const trainer = {
        id: object.object.id,
        Nombre: name,
        Categoria: category,
        Foto: photo,
        Biografia: bio
      }
			await setDoc(collectionRef,trainer);
			toast.success('¡Se actualizó al profesor exitosamente!', {position: toast.POSITION.TOP_RIGHT});
			onUpdate(trainer);
		} 
		catch (error){
      alert(error)
			toast.error('¡Error al actualizar al profesor!', {position: toast.POSITION.TOP_RIGHT});
		}
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === '' || photo === '' || category === '' || bio === '') {
      setFormError(true);
      return;
    }
    handleUpdate();
    setFormError(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>{flagView ? 'Detalles del profesor' : 'Actualización de profesor'}</DialogTitle>
      <DialogContent>{flagView ? 'Información detallada del profesor' : 'Edite a continuación los datos del profesor existente.'}</DialogContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nombre" value={name} onChange={handleNameChange} disabled={flagView}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Categoria" value={category} onChange={handleCategoryChange} disabled={flagView}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Foto" value={photo} onChange={handlePhotoChange} disabled={flagView}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Biografía" value={bio} onChange={handleBioChange} disabled={flagView}/>
          </Grid>
          {(!flagView && formError) && (<Grid item xs={12} justifyContent="flex-end"><p style={{ color: 'red' }}>Llene todos los formularios.</p></Grid>)}
          <Grid item xs={12} justifyContent="flex-end">
            <DialogActions>
                {flagView ?  
                  <Button variant="contained" color="primary" onClick={handleClose}>Cerrar</Button>
                : 
                  <>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                  </>
                }
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </Dialog>  
  );
};
export default TrainerEditViewDialog;