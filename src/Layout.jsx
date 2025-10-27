import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, Grid, Paper, Container, Stack } from '@mui/material';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Content from './components/DefaultContent';
import Sidebar from './components/Sidebar';

export default function Layout({ children }) {
    const [mode, setMode] = useState("light");

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"} sx={{ flexGrow: 1, height: '100%' }} >
                <Container sx={{ mx: 0, md: 0, height: '100%' }} maxWidth={false} id="home" >
                    <Stack
                        direction={{ xs: 'row' }}
                        spacing={3}
                        sx={{
                            height: '100vh',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            minWidth: '85vh',
                        }}
                    >
                        <Box
                            sx={{
                                height: { xs: "100%", md: "100%" }, // Ensure this Box takes 50% of the width
                                // padding: '1rem 0',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5rem',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Sidebar setMode={setMode} mode={mode} />
                        </Box>
                        <Box
                            sx={{

                                height: "100%", // Ensure this Box takes 50% of the width
                                // padding: 2,
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {children}
                        </Box>
                    </Stack>
                </Container>
                {/* </Grid> */}
            </Box>
        </ThemeProvider>

    );
}
