import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { toast } from "react-toastify";
import { doc, getFirestore, updateDoc } from "firebase/firestore/lite";




export const AdminUsersDeleteDialog = (props) => {
	// onRemove como prop
	const { onClose, open, object} = props;

	// console.log('AdminUsersDeleteDialog')
	const handleClose = () => onClose();



	const handleBlock = async () => {
		
		try {
			const db = getFirestore();
			const collectionRef = doc(db, 'users', object.object.id);

			const user = {
				uid: object.object.id,
				blocked: !object.object.blocked,
			  }

			await updateDoc(collectionRef,user);

			object.object.blocked ? toast.success('¡Se desbloqueó al usuario correctamente!', {position: toast.POSITION.TOP_RIGHT}) : toast.success('¡Se bloqueó al usuario correctamente!', {position: toast.POSITION.TOP_RIGHT});


		} 

		catch (error){
			console.log(error)
			toast.error('¡Error al bloquear el usuario!', {position: toast.POSITION.TOP_RIGHT});
		}
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Confirmación de bloqueo</DialogTitle>
			{object && object.object && object.object.blocked ? <DialogContent>¿Estás seguro de desbloquear a este usuario?</DialogContent> : <DialogContent>¿Estás seguro de bloquear a este usuario?</DialogContent>}
			{/* <DialogContent>¿Estás seguro de bloquear a este usuario?</DialogContent> */}
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				{object && object.object && object.object.blocked ? <Button onClick={handleBlock} color="success">Desbloquear</Button> : <Button onClick={handleBlock} color="error">Bloquear</Button>}
				{/* <Button onClick={handleBlock} color="error">Bloquear</Button> */}
			</DialogActions>
		</Dialog>
	);
};
