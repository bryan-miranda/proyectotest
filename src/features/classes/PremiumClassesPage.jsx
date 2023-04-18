import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ThemeProvider } from '@mui/material/styles';
import {
  Typography,
  Button,
  Grid,
  Box
} from '@mui/material';
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { classesTheme } from '../../theme/theme';
export const PremiumClassesPage = () => {

  const [classesData, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "yogaCategory"));
      const data = []
      querySnapshot.docs.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() })
      })
      setClasses(data);
    }
    fetchData().catch(console.error);
  }, [])

  
  function BackToTopButton() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function GoToClass(id, data){
    navigate('/class', { 
      state: { id: id, class: data }
    })
  }

  return (
    <>
      <ThemeProvider theme={classesTheme}>
        <Typography variant="h1" align="center" color="black">
          Clases premium
        </Typography>
        <Grid container width="100%">
          {classesData.map((classes, i) => (
            i % 2 === 0 ? (
              <div key={i} style={{display: 'flex'}}>
                <Grid item xs={6} sm={6} md={6} xl={6} padding="3%" backgroundColor="gray">
                  <div style={{ width: '100%', height: 'inherit', display: 'flex', flexWrap: 'wrap' }}>
                    <Typography variant="title" align="center" color="black">
                      {classes.name}
                    </Typography>

                    <Typography variant="body" align="justify" color="black">
                      {classes.description}
                    </Typography>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Button variant="outlined" onClick={event => GoToClass(i, classes)}>
                        Más información
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Box component={Grid} item md={6} xl={6} display={{ xs: "none", sm: "none", md: "block", xl: "block" }} padding="3%" backgroundColor="gray">
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'green' }}></div>
                </Box>
              </div>
            ) : (
              <div key={i} style={{display: 'flex'}}>
                <Box component={Grid} item md={6} xl={6} display={{ xs: "none", sm: "none", md: "block", xl: "block" }} padding="3%" backgroundColor="white">
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'green' }}></div>
                </Box>
                <Grid item xs={6} sm={6} md={6} xl={6} padding="3%" backgroundColor="white">
                  <div style={{ width: '100%', height: 'inherit', display: 'flex', flexWrap: 'wrap' }}>
                    <Typography variant="title" align="center" color="black">
                      {classes.name}
                    </Typography>

                    <Typography variant="body" align="justify" color="black">
                      {classes.description}
                    </Typography>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Button variant="outlined" onClick={event => GoToClass(i, classes)}>
                        Más información
                      </Button>
                    </div>
                  </div>
                </Grid>
              </div>
            )
          ))}
        </Grid>
        <Button variant="text" onClick={BackToTopButton}>
          <FaArrowUp/>
        </Button>
      </ThemeProvider>
    </>

  )
}
