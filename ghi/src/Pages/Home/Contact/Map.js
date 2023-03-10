/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Map = ({ themeMode = 'light' }) => {
    return (
        <Box paddingLeft={30} paddingBottom={10} maxHeight="20vh" margin="auto">
            <Box>
                <Typography
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'medium',
                    }}
                    gutterBottom
                    color={'textSecondary'}
                >
                    Contact us
                </Typography>
                <Box marginBottom={2}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Get in touch
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" color={'textSecondary'}>
                        We'd love to implement our services with your business.
                    </Typography>
                </Box>
            </Box>
            <Box marginY={4}>
                <Box
                    component={'iframe'}
                    borderRadius={2}
                    minHeight={400}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="map"
                    marginHeight="0"
                    marginWidth="0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=Losangelesa&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                    sx={{
                        filter:
                            themeMode === 'dark' ? 'grayscale(0.5) opacity(0.7)' : 'none',
                    }}
                />
            </Box>
        </Box>
    );
};

Map.propTypes = {
    themeMode: PropTypes.string.isRequired,
};

export default Map;
