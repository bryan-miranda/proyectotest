import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

const UserWithdrawDialog  = (props) => {
	const { onClose, open, object, user} = props;

	const handleClose = () => onClose();

	const handleWithdraw = async () => {
		const db = getFirestore();

		const claseRef = doc(db, "clases", object.object.id);
	  
		try {
		  const docSnapshot = await getDoc(claseRef);
	  
		  if (docSnapshot.exists()) {
			const data = docSnapshot.data();
	  
			const estudiantes = data.Estudiantes || {};
			delete estudiantes[user.uid];
	  
			await updateDoc(claseRef, { Estudiantes: estudiantes });
	  
			console.log("Estudiante eliminado exitosamente");
		  } else {
			console.log("No existe el documento!");
		  }
		} catch (error) {
		  console.error("Error al eliminar estudiante: ", error);
		}
	  
		handleClose();
	  };
	  
	  

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Confirmación de darse de baja</DialogTitle>
			<DialogContent>¿Estás seguro de darte de baja de este curso?</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" >Cancelar</Button>
				<Button onClick={handleWithdraw} color="error">Darse de baja</Button>
			</DialogActions>
		</Dialog>
	);
};
export default UserWithdrawDialog ;