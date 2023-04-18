import React, { useEffect, useState } from 'react'



import { DataGrid } from '@mui/x-data-grid';
import { TextField, IconButton, Divider } from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
// import BlockIcon from '@mui/icons-material/Block';
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
// import { AdminUsersDeleteDialog } from '../usersManagement/AdminUsersDeleteDialog'
import { AdminUsersUpdateDialog } from '../usersManagement/AdminUsersUpdateDialog';
import { AdminUsersDeleteDialog } from '../usersManagement/AdminUsersDeleteDialog';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';




export const AdminUsersPage = () => {

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchQuery, setSearchQuery] = useState('');

  const [openEditView, setOpenEditView] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [flagView, setFlagView] = React.useState(false);
  const [object, setObject] = React.useState([]);

  const columns = [
    { field: 'displayName', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Telefono', width: 150 },
    // { field: 'photoURL', headerName: 'Foto', width: 150 },
    {
      field: 'rol', headerName: 'Rol', width: 150,
      renderCell: (params) => (
        <> {params.value === 'admin' ? (
          'Administrador'
        ) : (
          'Usuario'
        )}

        </>
      )
    },
    {
      field: 'blocked',
      headerName: 'Activo',
      width: 150,
      renderCell: (params) => (
        <>
          {params.value ? (
            // 'falso'
            <CloseIcon />
          ) : (
            // 'verdadero' 
            <CheckIcon />

          )}
        </>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="error" aria-label="delete" variant="contained" size="small" onClick={() => { setOpenDelete(true); setObject({ object: params.row }); }}>
            {params.row.blocked ? (<LockIcon />) : (<LockOpenIcon />)}
          </IconButton>
          <IconButton color="success" aria-label="edit" variant="contained" size="small" onClick={() => { setOpenEditView(true); setObject({ object: params.row }); }}>
            <Edit />
          </IconButton>
          <IconButton color="primary" aria-label="view" variant="contained" size="small" onClick={() => { setOpenEditView(true); setFlagView(true); setObject({ object: params.row }); }}>
            <Visibility />
          </IconButton>
        </>
      ),
    },
  ];



  // const handleUpdate = (object) => {
  //   const index = rows.findIndex((row) => row.id === object.id);
  //   const filteredIndex = filteredRows.findIndex((row) => row.id === object.id);
  //   const rowsUpdated = [...rows];
  //   rowsUpdated[index] = object;
  //   setRows(rowsUpdated);
  //   const rowsFilteredUpdated = [...filteredRows];
  //   rowsFilteredUpdated[filteredIndex] = object;
  //   setRows(rowsFilteredUpdated);
  // };


  const handleClose = () => {
    setOpenDelete(false);
    setOpenEditView(false);
    setFlagView(false);
  };

  // filter
  useEffect(() => {
    const newFilteredRows = rows.filter((row) => Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())));
    setFilteredRows(newFilteredRows);
  }, [rows, searchQuery]);


  // load users
  useEffect(() => {
    const db = getFirestore();
    console.log('load users')

    // cargar data por primera vez
    const fetchData = async () => {

      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRows(data);
      setFilteredRows(data);
    }
    fetchData().catch(console.error);

    // escuchar cambios en la base de datos para actualizar la data
    const listener = onSnapshot(collection(db, "users"), (querySnapshot) => {
      fetchData().catch(console.error);
    });

    return () => {
      listener();
    }

  }, []);


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: 400, width: '70%' }}>
          <div style={{ textAlign: 'left' }}>
            <TextField label="Buscar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Divider />
          <DataGrid rows={filteredRows} columns={columns} autoPageSize disableRowSelectionOnClick disableColumnMenu={true} sx={{ mt: 2 }}
          />
        </div>
      </div>
      {/* <AdminUsersUpdateDialog open={openEditView} onClose={handleClose} onUpdate={handleUpdate} object={object} flagView={flagView}/> 
                <AdminUsersDeleteDialog open={openDelete} onClose={handleClose} onRemove={handleUpdate} object={object} /> */}

      <AdminUsersUpdateDialog open={openEditView} onClose={handleClose} object={object} flagView={flagView} />
      <AdminUsersDeleteDialog open={openDelete} onClose={handleClose} object={object} />

    </>
  );

}

