import { createTheme } from '@mui/material/styles';

const colorsPalette = {
    yellow: '#ffd51e',
    turquoise: '#31aab1',
    pink: '#ff9a8c',
    gray: '#f9f9f9',
    green: '#928e7e',
    white: '#ffffff',
    black: '#333333'
}

export const appBarTheme = createTheme({
    palette: {
        primary: {
            main: colorsPalette.pink
        }
    }
});

export const classesTheme = createTheme({
    palette: {
        white: colorsPalette.white,
        gray: colorsPalette.gray,
        black: colorsPalette.black,
    },
    typography: {
        fontFamily: [
            'Poppins',
        ].join(','),
        h1: {
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: 3,
            letterSpacing: '-0.00833em',
            fontFamily: 'Prata'
        },
        title: {
            fontWeight: 400,
            fontSize: '1.7rem',
            lineHeight: 3,
            width: '100%',
            fontFamily: 'Prata'
        },
        body: {
            fontSize: '1.25rem',
            lineHeight: 1.5,
            width: '100%'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    fontFamily: 'Arial',
                    borderRadius: '20px',
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    fontSize: '1rem',
                    marginTop: '4%',
                    '&:hover': {
                        backgroundColor: '#575757',
                        borderColor: '#575757'
                    }
                },
                text: {
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    fontSize: '14px',
                    color: '#fff',
                    backgroundColor: '#000',
                    padding: '10px',
                    borderRadius: '5px',
                    zIndex: 99,
                    '&:hover': {
                        backgroundColor: '#333',
                    }
                }
            }
        }
    }
});

export const specificClassTheme = createTheme({
    palette: {
        gray: colorsPalette.gray
    },
    typography: {
        fontFamily: [
            'Poppins',
        ].join(','),
        h1: { //Class title
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: 3,
            letterSpacing: '-0.00833em',
            fontFamily: 'Prata'
        },
        classDescription: { //Class description
            display: 'flex',
            fontSize: '1.5rem',
            lineHeight: 1.5,
            textAlign: 'justify'
        },
        accordionText: { //Accordion text
            display: 'flex',
            fontSize: '1.25rem',
            lineHeight: 1.5,
            textAlign: 'justify',
        },
        accordionTitle: { //Accordion section title
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        subtitle2: { //Professor name
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            fontSize: '1.75rem'
        },
        professorCardSubtitle: {
            fontSize: '1rem',
            textTransform: 'uppercase',
            color: "#808080",
            letterSpacing: '1px',
        },
        professorCardInfo: {
            fontSize: '1.5rem',
            color: "black",
            textTransform: 'none'
        }     
    },
});

export const adminAboutTheme = createTheme({
    palette: {
        black: colorsPalette.black,
        gray: colorsPalette.gray,
        white: colorsPalette.white
    },
});

export const aboutTheme = createTheme({
    palette: {
        black: colorsPalette.black,
        gray: colorsPalette.gray,
        white: colorsPalette.white
    },
    typography: {
        fontFamily: [
            'Poppins',
        ].join(','),
        h1: {
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: 3,
            letterSpacing: '-0.00833em'
        },
        h2: {
            fontWeight: 400,
            fontSize: '35px',
            lineHeight: 3,
            letterSpacing: '-0.00833em',
            fontFamily: 'Prata'
        },
        h5: {
            fontSize: '25px',
            lineHeight: 1.5,
        },
        trainerName: {
            fontSize: '20px',
            lineHeight: 1.5,
            width: '100%'
        },
        trainerBio: {
            fontSize: '17px',
            lineHeight: 1.5,
            textAlign: 'justify'
        }
    }
});