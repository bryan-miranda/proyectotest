import { Grid } from '@mui/material'
import React from 'react'
import './Footer.css'
import { FaLink, FaYoutube, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase/config';

export const Footer = () => {
  const [data, setData] = useState({});
  const [logo, setLogo] = useState({});

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "aboutus"));
      const data = querySnapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      ));
      setData(data[0]);
    }
    fetchData().catch(console.error);

    getDownloadURL(ref(storage, "images/Logo.png")).then((url) => {
      setLogo(url);
    })
  }, [])

  return (
    <>
      <Grid container spacing={4}
        direction="row"
        justifyContent={'center'}
        alignItems={'flex-start'}
        textAlign={'center'}
       
        sx={{backgroundColor: 'blanchedalmond'}}>
        <Grid item sm={12} md={6} lg={3} xl={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="" style={{ borderRadius: '50%', width: '50%', padding: '2%' }} />
        </Grid>
        <Grid item sm={12} md={6} lg={4} xl={4}>
          <h2>
            Contáctenos
          </h2>
          <p style={{ maxWidth: '80%', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
            Contáctenos a través de correo electrónico o número de teléfono para realizar cualquier consulta.<br />
            <br /><FaLink size="0.7rem" /> {data.email}
            <br /><FaPhone size="0.7rem" /> {data.phone}
          </p>
        </Grid>
        <Grid item sm={12} md={6} lg={4} xl={4}>
          <h2>
            Nuestras redes sociales
          </h2>
          <div className="socials">
            <span><a href={data.youtube} target="_blank" rel="noreferrer"><FaYoutube color="red" size="40%" /></a></span>
            <span><a href={data.instagram} target="_blank" rel="noreferrer"><FaInstagram size="30%" color="black" /></a></span>
            <span><a href={data.facebook} target="_blank" rel="noreferrer"><FaFacebook color="blue" size="35%" /></a></span>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
