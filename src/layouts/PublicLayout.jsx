import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import {Navbar} from '../components/Navbar'
import {Footer} from '../components/Footer'
import {Loader} from '../components/Loader'

export const PublicLayout = () => {
  
  const navigation = useNavigation()
  
  return (
    <>
    <Navbar/>
        {
          navigation.state === 'loading' && <Loader/>
        }
        <Outlet/> 
    <Footer/>
    </>

  )
}
