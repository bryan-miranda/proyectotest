import { ThemeProvider } from '@mui/material/styles';
import { Typography, Grid, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { specificClassTheme } from '../../theme/theme';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SpecificClassPage = () => {
    const data = useLocation().state;
    
    return (
        <>
            <ThemeProvider theme={specificClassTheme}>
                <Typography variant="h1" align="center" color="black">
                    {data.class.name}
                </Typography>
                <Typography align="center">
                    <img src='https://placehold.jp/3500x1080.png' style={{ maxWidth: '90%', maxHeight: '500px' }} alt="classImage" />
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                    <Grid container width="90%">
                        <Grid item xs={12} sm={12} md={4} xl={4}  >
                            <Grid container width="100%" backgroundColor="gray" padding="2%" sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                <Grid item xs={3} sm={4} md={4} xl={4}>
                                    <img src='https://placehold.jp/200x200.png' alt="" style={{ borderRadius: '50%', maxWidth: '100%', padding: '2%' }} />
                                </Grid>
                                <Grid item md={8} xl={8} padding="5%">
                                    <Typography variant="subtitle2">
                                        {data.class.professor}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} xl={12} marginTop="4%" marginLeft="5%">
                                    <Typography variant="professorCardSubtitle">
                                        Precio
                                    </Typography>
                                    <br />
                                    <Typography variant="professorCardInfo">
                                        {data.class.price}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} xl={12} marginTop="4%" marginLeft="5%" marginBottom="2%">
                                    <Typography variant="professorCardSubtitle">
                                        Duración
                                    </Typography>
                                    <br />
                                    <Typography variant="professorCardInfo">
                                        {data.class.duration} horas.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} xl={8} padding="2%">
                            <Typography variant="classDescription">
                                {data.class.description}
                            </Typography>
                            <Accordion sx={{ marginTop: '2%' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ backgroundColor: 'gray' }}
                                >
                                    <Typography variant="accordionTitle">Materiales</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List dense={true}>
                                        {data.class.tools.map((tool, i) => (
                                            <ListItem key={i}>
                                                <Typography variant="accordionText">
                                                    - {tool}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    sx={{ backgroundColor: 'gray' }}
                                >
                                    <Typography variant="accordionTitle">¿Qué esperar de la clase?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="accordionTitle" marginLeft="1%">
                                        {data.class.expect}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disabled>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography variant="accordionTitle">Horario</Typography>
                                </AccordionSummary>
                            </Accordion>
                        </Grid>

                    </Grid>
                </div>


            </ThemeProvider>
        </>
    )
}
