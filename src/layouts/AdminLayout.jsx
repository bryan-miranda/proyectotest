import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { Box } from '@mui/system'
import {Loader} from '../components/Loader'
import { Sidebar } from '../features/admin/components/AdminSidebar'
import Toolbar from "@mui/material/Toolbar";
export const AdminLayout = () => {
  
  const navigation = useNavigation()
  
  return (
    <>
    <Box sx={{ display: "flex" }}>
    <Sidebar/>
        {
          navigation.state === 'loading' && <Loader/>
        }
    <Box 
        component='main'
        sx={{ flexGrow:1, p:3}}> 
            <Toolbar/>
            <Outlet/> 
    </Box>
    </Box>

    </>

  )
}
