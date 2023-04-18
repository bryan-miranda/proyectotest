import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
// import { toast } from 'react-toastify';

const UserEnrollmentDialog = (props) => {
  const { onClose, open, object, user } = props;

  const handleClose = () => onClose();

  const handleEnrollment = async () => {
    const db = getFirestore();

    const claseRef = doc(db, "clases", object.object.id);

    try {
      const docSnapshot = await getDoc(claseRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        const estudiantes = data.Estudiantes || {};
        estudiantes[user.uid] = { nombre: user.displayName, edad: user.email };

        await updateDoc(claseRef, { Estudiantes: estudiantes });

        console.log("Estudiante agregado exitosamente");
      } else {
        console.log("No existe el documento!");
      }
    } catch (error) {
      console.error("Error al agregar estudiante: ", error);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmar matricula</DialogTitle>
      <DialogContent>¿Estás seguro de matricular este curso?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        <Button onClick={handleEnrollment} color="error">
          Matricular
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserEnrollmentDialog;
