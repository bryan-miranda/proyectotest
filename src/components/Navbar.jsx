import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom"; // class active :)
import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { appBarTheme } from "../theme/theme";
import { LogoutOutlined, Settings } from "@mui/icons-material";
import { startLogout } from "../store/auth/thunks";

const pages = [
  { text: "¿Quiénes somos?", ref: "/" },
  { text: "Clases", ref: "/classes" },
  { text: "Clases Premium", ref: "/premiumclasses" },
  { text: "Horarios", ref: "/schedule" },
];
const userSettings = [
  { text: "Perfil", ref: "/profile" },
  { text: "Clases", ref: "/userclasses" },
  { text: "Logout", ref: "/profile" },
];

export const Navbar = () => {
  const { status, rol, displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "merriweather",
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Respira Yoga
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <NavLink
                    to={page.ref}
                    key={page.text}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.text}</Typography>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "raleway",
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Respira Yoga
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', marginLeft: "3%" }}
                  href={page.ref}
                >
                  {page.text}
                </Button>
              ))}
            </Box>

            {/* Perfil de usuario */}
            {status === "authenticated" && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* <MenuItem  >
                  <Typography textAlign="center">Perfil</Typography>
            </MenuItem>
            <NavLink to="/profile">Profile</NavLink> */}

                  <NavLink to="/profile" key="profile" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Perfil</Typography>
                    </MenuItem>
                  </NavLink>

                  <NavLink
                    to="/userclasses"
                    key="userclasses"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Mis Clases</Typography>
                    </MenuItem>
                  </NavLink>

                  <NavLink to="/" key="logout" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={onLogout}>
                      <Typography textAlign="center">Cerrar sesión</Typography>
                    </MenuItem>
                  </NavLink>

                  {rol === 'admin' && (
                    <NavLink to="/admin" key="admin" style={{ textDecoration: 'none', color: 'black' }}>
                      <MenuItem>
                        <Typography textAlign="center">Admin</Typography>
                      </MenuItem>
                    </NavLink>
                  )}
                </Menu>
              </Box>
            )}

            {status === 'not-authenticated' && (
              <NavLink to="/auth/login" key="login" style={{ textDecoration: 'none', color: 'white' }}>
                <MenuItem>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </NavLink>
              // <NavLink to="/auth/login">login</NavLink>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
