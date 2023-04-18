import React from 'react'
import { Grid, Typography } from '@mui/material'

export const AuthLayout = ({children, title=''}) => {
  return (
    <Grid
        container 
        spacing={ 0 } 
        direction='column'
        alignItems='center' 
        justifyContent='center'
    >
        <Grid 
            item 
            className='box-shadow' 
            // tamano de la caja
            xs= {3} 
            // estilo
            sx = {{backgroundColor: 'white', padding: 3, borderRadius:2,
            width:{ md:450 } }}
        > 
            <Typography variant='h5' sx={{mb:1}}> 
              {title} 
            </Typography>
            {children}
        </Grid>
    
    
    </Grid>
  )
}
