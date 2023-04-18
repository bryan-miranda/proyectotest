import {Grid, CircularProgress} from '@mui/material'
import React from 'react'

export const Loader = () => {
  return (
    <Grid
        container 
        spacing={ 0 } 
        direction='column'
        alignItems='center' 
        justifyContent='center'
        sx={{ minHeight: '100vh' }}
    >
        <Grid 
            container 
            direction='row'
            alignItems='center'
            justifyContent='center'
        > 
        <CircularProgress />
        </Grid>
    </Grid>
  )
}
