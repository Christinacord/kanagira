import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TerrainIcon from '@mui/icons-material/Terrain';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import ApiIcon from '@mui/icons-material/Api';

export default function Features() {
    const theme = useTheme();
    const features = [
        {
            title: 'Scalable',
            subtitle:
                'Our product was made with scale in mind. Multiple boards allows easy use for companies with a multitude of agile teams at work.',
            icon: <TerrainIcon />,
        },
        {
            title: 'Responsive UI',
            subtitle:
                'Beautifully crafted user interface designed to respond to any size device. Work from your desktop, tablet or mobile phone.',
            icon: <SendToMobileIcon />,
        },
        {
            title: 'Integratable',
            subtitle: 'Our intuitive API makes it easy to automate issue creation and other aspects of agile production.',
            icon: <ApiIcon />,
        },
    ];

    return (
        <Box paddingTop={10} paddingBottom={10} style={{ backgroundColor: '#F7F9FC' }}>
            <Box marginBottom={4}>
                <Box component={Typography} fontWeight={700} variant={'h3'} gutterBottom align={'center'}>
                    An agile board built
                    <br />
                    for all kinds of businesses
                </Box>
                <Typography variant={'h6'} component={'p'} color={'textSecondary'} align={'center'}>
                    Manage workloads and run an agile environment with ease.
                    <br />
                    An experience you'd expect from a kanban board.
                </Typography>
            </Box>
            <Grid container justifyContent="center">
                {features.map(({ title, subtitle, icon }) => (
                    <Grid item xs={12} md={2} paddingTop={2} paddingLeft={8} key={title}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                width: '320px',
                                height: '200px',
                                display: 'inline-block',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CardHeader
                                avatar={icon}
                                title={title}
                                sx={{ fontWeight: 500 }}
                            />
                            <CardContent>
                                <Typography color="text.secondary">{subtitle}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
