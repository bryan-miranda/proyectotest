import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, IconButton, Button, Grid, Container } from "@mui/material";
import { Block, Check } from "@mui/icons-material";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { FirebaseAuth } from "../../../firebase/config";
import UserEnrollmentDialog from "./UserEnrollmentDialog";
import UserWithdrawDialog from "./UserWithdrawDialog";

export const UserClassesTable = () => {
  // const [data, setData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  
  const [user, setUser] = React.useState({});
  const [filteredRows, setFilteredRows] = useState(rows);
  
  const [searchQuery, setSearchQuery] = React.useState('');

  const [openEnrollment, setOpenEnrollment] = React.useState(false);
  const [openWithdraw, setOpenWithdraw] = React.useState(false);
  const [object, setObject] = React.useState([]);

  const columns = [
    { field: "Cupos", headerName: "Cupos", width: 100 },
    { field: "Fecha", headerName: "Fecha", width: 200 },
    { field: "Hora", headerName: "Hora", width: 100 },
    { field: "Nombre", headerName: "Nombre", width: 200 },
    { field: "Profesor", headerName: "Profesor", width: 200 },
    { field: "Tipo", headerName: "Tipo", width: 200 },
    { field: "actions",
      headerName: "Acciones",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            aria-label="delete"
            variant="contained"
            size="small"
            onClick={() => {setOpenEnrollment(true); setObject({object: params.row});}}
          >
            <Check />
          </IconButton>
          <IconButton
            color="error"
            aria-label="view"
            variant="contained"
            size="small"
            onClick={() => {setOpenWithdraw(true); setObject({object: params.row});}}
          >
            <Block />
          </IconButton>
        </>
      ),
    },
  ];

  
  const handleClose = () => {
    setOpenEnrollment(false);
    setOpenWithdraw(false);
  };
  
  useEffect(() => {
    const newFilteredRows = rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredRows(newFilteredRows);
  }, [rows, searchQuery]);

  useEffect(() => {
    const curUser = FirebaseAuth.currentUser;

    setUser( {uid :curUser.uid ,email: curUser.email, displayName: curUser.displayName});

    const db = getFirestore();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "clases"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //EN CASO DE USARLO EN ALGÚN COMPONENTE NUEVO GUARDARLO EN UN STATE
      // setData(data);

      //EN CASO DE USARLO EN ALGÚN COMPONENTE DE TIPO TABLA, GUARDARLO EN LOS STATE DE ROWS Y FILTERED ROWS
      setRows(data);
      setFilteredRows(data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Container>
      
      <Grid
        container
        sx={{
          justifyContent: "left",
          mt: 10,
          mb: 10,
        }}
        rowSpacing={1}
      >
        <Grid item>
          <TextField
            label="Buscar"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button
            sx={{ ml: 0.5, height: 39 }}
            variant="contained"
            onClick={() => {
              alert("Se hizo Click");
            }}
            color="primary"
          >
            Buscar
          </Button>
        </Grid>
        <Grid
          item
          sx={{
            height: "50vh",
            width: "100%",
            justifyContent: "left",
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoPageSize
            disableRowSelectionOnClick
            disableColumnMenu={true}
          />
        </Grid>
      </Grid>
        <UserEnrollmentDialog open={openEnrollment} onClose={handleClose} object={object} user={user}/>
        <UserWithdrawDialog open={openWithdraw} onClose={handleClose} object={object} user={user}/> 
    </Container>
  );
};
