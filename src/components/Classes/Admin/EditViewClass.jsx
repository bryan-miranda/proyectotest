import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Grid,
} from "@mui/material";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const EditViewClass = (props) => {
  const { onClose, open, object, onUpdate, flagView } = props;
  const [name, setName] = useState("");
  const [hour, setHour] = useState("");
  const [type, setType] = useState("");
  const [trainer, setTrainer] = useState("");
  const [quota, setQuota] = useState("");
  const [formError, setFormError] = useState(false);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (object && object.object) {
      setName(object.object.Nombre);
      setHour(object.object.Hora);
      setType(object.object.Tipo);
      setTrainer(object.object.Profesor);
      setQuota(object.object.Cupos);
    }
  }, [object]);

  const handleClose = () => onClose();
  const handleNameChange = (event) => setName(event.target.value);
  const handleHourChange = (event) => setHour(event.target.value);
  const handleTypeChange = (event) => setType(event.target.value);
  const handleTrainerChange = (event) => setTrainer(event.target.value);
  const handleQuotaChange = (event) => setQuota(event.target.value);

  const handleUpdate = async () => {
    const db = getFirestore();
    const collectionRef = doc(db, "clases", object.object.id);
    try {
      const currentClass = {
        Nombre: name,
        Hora: hour,
        Tipo: type,
        Profesor: trainer,
        Cupos: quota,
      };
      await setDoc(collectionRef, currentClass);
      toast.success("¡Se actualizó la clase exitosamente!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onUpdate(currentClass);
    } catch (error) {
      alert(error);
      toast.error("¡Error al actualizar la clase!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      hour === "" ||
      type === "" ||
      trainer === "" ||
      quota === ""
    ) {
      setFormError(true);
      return;
    }
    handleUpdate();
    setFormError(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {flagView ? "Detalles de la clase" : "Actualización de la clase"}
      </DialogTitle>
      <DialogContent>
        {flagView
          ? "Información detallada de la clase"
          : "Edite a continuación los datos de la clase existente."}
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              value={name}
              onChange={handleNameChange}
              disabled={flagView}
            />
          </Grid>
          <Grid item xs={4}>
            <div>
              <p>Fecha: {hour}</p>
              <input
                type="date"
                value={hour}
                onChange={handleHourChange}
                ref={dateInputRef}
                disabled={flagView}
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Tipo"
              value={type}
              onChange={handleTypeChange}
              disabled={flagView}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profesor"
              value={trainer}
              onChange={handleTrainerChange}
              disabled={flagView}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Cupos"
              value={quota}
              onChange={handleQuotaChange}
              disabled={flagView}
            />
          </Grid>
          {!flagView && formError && (
            <Grid item xs={12} justifyContent="flex-end">
              <p style={{ color: "red" }}>Llene todos los formularios.</p>
            </Grid>
          )}
          <Grid item xs={12} justifyContent="flex-end">
            <DialogActions>
              {flagView ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
              ) : (
                <>
                  <Button onClick={handleClose}>Cerrar</Button>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar
                  </Button>
                </>
              )}
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
export default EditViewClass;
