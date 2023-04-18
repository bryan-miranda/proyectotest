import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Grid,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/config";

export const AdminUsersUpdateDialog = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset 
  } = useForm( {
    defaultValues: {
      photoURL: "",
    }
  });

  const { onClose, open, object, flagView } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (object && object.object) {
      reset(object.object);
      setValue("displayName", object.object.displayName || "");
      setValue("email", object.object.email || "");
      setValue("phone", object.object.phone || "");
      setValue("photoURL", object.object.photoURL || "");
      setValue("rol", object.object.rol || "user");
      console.log("se ejecuta");
    }
  }, [object, setValue, reset]);

  const uploadFile = async (file) => {
    // el nombre del archivo debe ser unico si no se sobrescribe, puede ser el uid del usuario o
    setLoading(true);
    try {
      const storageRef = ref(storage, "avatar/" + object.object.id);
      await uploadBytes(storageRef, file);
      const res = await getDownloadURL(storageRef);
      setValue("photoURL", res);
    } catch (error) {
      toast.error("¡Error al subir la imagen!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setLoading(false);
  };

  const handleClose = () => onClose();

  const handleUpdate = async (data) => {
    const db = getFirestore();
    const collectionRef = doc(db, "users", object.object.id);
    try {
      const user = {
        uid: object.object.id,
        displayName: data.displayName,
        email: data.email,
        phone: data.phone,
        photoURL: data.photoURL,
        rol: data.rol,
      };
      await updateDoc(collectionRef, user);
      toast.success("¡Se actualizó el usuario exitosamente!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // onUpdate(user);
    } catch (error) {
      toast.error("¡Error al actualizar el usuario!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    handleClose();
  };

  const onSubmit = (data) => {
    handleUpdate(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {flagView ? "Detalles del usuario" : "Actualización del usuario"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                alt="Foto de perfil"
                src={
                      getValues("photoURL")
                    ? getValues("photoURL")
                    : object?.object?.photoURL
                    ? object.object.photoURL
                    : "https://via.placeholder.com/150"
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                defaultValue={setValue.displayName}
                name="displayName"
                fullWidth
                {...register("displayName", { required: true })}
                disabled={flagView}
              />
              {errors.displayName && (
                <FormHelperText error>Este campo es requerido</FormHelperText>
              )}
            </Grid>

            {flagView ? null : (
              <Grid item xs={12} sm={6}>
                <label htmlFor="photo-upload">
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress size={24} style={{ marginRight: 10 }} />
                      <span>Cargando...</span>
                    </div>
                  ) : (
                    <label htmlFor="photo-upload">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Cambiar Foto
                      </Button>
                    </label>
                  )}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  {...register("photoURL")}
                  onChange={(event) => {
                    uploadFile(event.target.files[0]);
                  }}
                  style={{ display: "none" }}
                  disabled={flagView}
                />
              </Grid>
            )}

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField
                label="Correo"
                defaultValue={setValue.email}
                fullWidth
                {...register("email", { required: true })}
                disabled
              />
              {errors.email && (
                <FormHelperText error>Este campo es requerido</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Telefono"
                defaultValue={setValue.phone}
                fullWidth
                {...register("phone", { required: true })}
                disabled={flagView}
              />
              {errors.phone && (
                <FormHelperText error>Este campo es requerido</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Rol</InputLabel>
              <Select
                // label="Rol"
                labelId="rol-select-label"
                fullWidth
                defaultValue={
                  object && object.object && object.object.rol
                    ? object.object.rol
                    : ""
                }
                {...register("rol", { required: true })}
                disabled={flagView}
              >
                <MenuItem value={"user"}>Usuario</MenuItem>
                <MenuItem value={"admin"}>Administrador</MenuItem>
              </Select>
            </Grid>

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
      </DialogContent>
    </Dialog>
  );
};
