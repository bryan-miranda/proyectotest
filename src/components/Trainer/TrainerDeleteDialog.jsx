import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

const TrainerCreateDialog = (props) => {
	const { onClose, open, object , onRemove} = props;

	const handleClose = () => onClose();

	const handleDelete = async () => {
		const db = getFirestore();
		const docRef = doc(db, 'profesores', object.object.id);
		try {
			await deleteDoc(docRef);
			toast.success('¡Se eliminó al profesor exitosamente!', {position: toast.POSITION.TOP_RIGHT});
			onRemove(object.object.id);
		} 
		catch (error){
			toast.error('¡Error al borrar al profesor!', {position: toast.POSITION.TOP_RIGHT});
		}
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Confirmación de borrado</DialogTitle>
			<DialogContent>¿Estás seguro de borrar a este profesor?</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={handleDelete} color="error">Borrar</Button>
			</DialogActions>
		</Dialog>
	);
};
export default TrainerCreateDialog;