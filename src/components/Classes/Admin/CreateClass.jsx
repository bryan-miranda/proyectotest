import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Grid,
} from "@mui/material";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const CreateClass = (props) => {
  const { onClose, open, onCreate } = props;
  const [name, setName] = useState("");
  const [hour, setHour] = useState("");
  const [type, setType] = useState("");
  const [trainer, setTrainer] = useState("");
  const [quota, setQuota] = useState("");
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const [formError, setFormError] = useState(false);

  const handleClose = () => onClose();
  const handleNameChange = (event) => setName(event.target.value);
  const handleHourChange = (event) => setHour(event.target.value);
  const handleTypeChange = (event) => setType(event.target.value);
  const handleTrainerChange = (event) => setTrainer(event.target.value);
  const handleQuotaChange = (event) => setQuota(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);

  const handleCreate = async () => {
    const db = getFirestore();
    const collectionRef = collection(db, "clases");
    try {
      const newClass = {
        Nombre: name,
        Hora: hour,
        Tipo: type,
        Profesor: trainer,
        Cupos: quota,
        Fecha: date,
      };
      const docRef = await addDoc(collectionRef, newClass);
      newClass.id = docRef.id;
      onCreate(newClass);
      toast.success("¡Se agregó la clase exitosamente!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("¡Error al agregar la clase!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    handleClose();
  };

  const resetValues = () => {
    setName("");
    setHour("");
    setType("");
    setTrainer("");
    setQuota("");
    setDate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      hour === "" ||
      type === "" ||
      trainer === "" ||
      quota === "" ||
      date === ""
    ) {
      setFormError(true);
      return;
    }
    handleCreate();
    setFormError(false);
    resetValues();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Creación de clase</DialogTitle>
      <DialogContent>
        Ingrese a continuación los datos de la nueva clase.
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Hora" value={hour} onChange={handleHourChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Tipo" value={type} onChange={handleTypeChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profesor"
              value={trainer}
              onChange={handleTrainerChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cupos"
              value={quota}
              onChange={handleQuotaChange}
            />
          </Grid>
          <Grid>
            <div>
              <p>Fecha: {date}</p>
              <input
                value={date}
                type="date"
                onChange={handleDateChange}
                ref={dateInputRef}
              />
            </div>
          </Grid>
          {formError && (
            <Grid item xs={12} justifyContent="flex-end">
              <p style={{ color: "red" }}>Llene todos los formularios.</p>
            </Grid>
          )}
          <Grid item xs={12} justifyContent="flex-end">
            <DialogActions>
              <Button onClick={handleClose}>Cerrar</Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
export default CreateClass;
