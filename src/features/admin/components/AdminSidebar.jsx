import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import GroupIcon from '@mui/icons-material/Group';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LogoutOutlined } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton, Typography, Toolbar, ListItemText, ListItemIcon, ListItemButton, ListItem, List, Drawer, Divider, CssBaseline, Box, AppBar } from "@mui/material";
import { startLogout } from "../../../store/auth/thunks";

const drawerWidth = 240;

export const Sidebar = (props) => {
  const { window } = props;
  const { displayName } = useSelector((state) => state.auth);
  const [ actualPage, setActualPage] = useState('¿Quiénes somos?');
  const [mobileOpen, setMobileOpen] = useState(false);
  // const dispatch = useDispatch()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageChange = (page) => { 
    setActualPage(page)
  }

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }


  const items = [
    {
      primary: "¿Quiénes somos?",
      link: "/admin",
      secondary: "",
      icon: <InfoIcon />,
    },
    {
      primary: "Usuarios",
      link: "/admin/users",
      secondary: "",
      icon: <GroupIcon />,
    },
    {
      primary: "Categorías de yoga",
      link: "/admin/yoga-categories",
      secondary: "",
      icon: <SelfImprovementIcon />,
    },
    {
      primary: "Instructores",
      link: "/admin/instructors",
      secondary: "",
      icon: <AssignmentIndIcon />,
    },
    {
      primary: "Clases",
      link: "/admin/classes",
      secondary: "",
      icon: <CalendarMonthIcon />,
    },

  ];

  const drawer = (
    <div>
      <Toolbar />
      <Grid container          
          justifyContent="space-between"
          alignItems="center">
        <Grid item xs={10}>
          <Typography variant="h5">{displayName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" component={NavLink} to={'/'}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>

      </Grid>
      <Divider />
      <List>
        {items.map((element) => (
          <ListItem key={element.primary} disablePadding >
            <ListItemButton component={NavLink} to={element.link} onClick={ () => handlePageChange(element.primary)} >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.primary} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {actualPage}
          </Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>

        </Grid>

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};