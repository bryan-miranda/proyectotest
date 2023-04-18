import React from 'react'
import { Card, Grid, Typography } from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FaInstagram } from 'react-icons/fa';
import { ThemeProvider } from '@emotion/react';
import { aboutTheme } from '../../theme/theme';
import { storage } from '../../firebase/config';
import { getDownloadURL, ref } from 'firebase/storage';


export const AboutPage = () => {

  const [data, setData] = useState([]);
  const [trainersData, setTrainersData] = useState([]);

  const [aboutImage, setAboutImage] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "aboutus"));
      const data = []
      querySnapshot.docs.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() })
      })
      setData(data[0]);
    }
    fetchData().catch(console.error);

    const fetchData2 = async () => {
      const querySnapshot2 = await getDocs(collection(db, "trainers"));
      const data2 = []
      querySnapshot2.docs.forEach(doc => {
        if (doc.data().active)
          data2.push({ id: doc.id, ...doc.data() })
      })
      setTrainersData(data2);
    }
    fetchData().catch(console.error);

    getDownloadURL(ref(storage, "images/About.png")).then((url) => {
      setAboutImage(url);
    })

    return () => {
      fetchData();
      fetchData2();
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={aboutTheme}>
        <Typography variant="h1" align="center" color="black">
          ¿Quiénes somos?
        </Typography>
        <Grid container>
          <Grid item sm={12} md={12} lg={5} xl={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={aboutImage} style={{ maxWidth: '100%' }} alt="" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
            <Typography variant="h2" align="center" color="black">
              {data.name}
            </Typography>
            <Typography variant="h5" align="justify" sx={{ ml: '10%', mr: '10%' }}>
              {data.description}
            </Typography>

          </Grid>
        </Grid>
        <Grid container
          direction="row"
          justifyContent={'center'}
          alignItems={'flex-start'}
          width="100%"
          padding="3%"
          backgroundColor="beige">
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h1" align="center" color="black">
              Nuestra familia otaku kawai
            </Typography>
          </Grid>
          {
            trainersData && trainersData.map((el, i) => (
              (
                <Grid key={i} item xs={12} sm={6} md={6} lg={4} xl={4} sx={{ padding: '1%' }}>
                  <Card>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img src='https://placehold.jp/200x200.png' style={{ borderRadius: '50%', height: '50%', maxHeight: '200px' }} alt="Trainer" />
                    </div>
                    <hr />
                    <Typography variant='trainerName' sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      {el.name}
                    </Typography>
                    <Typography variant='trainerBio' sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', padding: '4%' }}>
                      {el.bio}
                    </Typography>
                    <div style={{ textAlign: 'center' }}>
                      <a href={el.instagram} target="_blank" rel="noreferrer"><FaInstagram size="7%" color="black" /></a>
                    </div>
                  </Card>
                </Grid>
              )))
          }
        </Grid >
      </ThemeProvider >
    </>
  )
}
