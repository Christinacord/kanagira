import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import RocketIllustration from '../../svg/illustrations/Rocket';
import Features from './Features.js';
import Faq from './FaqAccordion.js';
import Contact from './Contact/ContactUs.js';

export default function HomePage() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <>
    <Grid container sx={{ paddingLeft: 20, paddingBottom: 2}}>
      <Grid item container alignItems={'center'} justifyContent={'center'} xs={12} md={6} sx={{ paddingLeft: isMd ? 8 : 0 }}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              color="textPrimary"
              sx={{
                fontWeight: 700,
              }}
            >
              Concept to launch
              <br />
              in {' '}
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
              >
                record time.
              </Typography>
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography
              variant="h6"
              component="p"
              color="textSecondary"
              sx={{ fontWeight: 400 }}
            >
              Teamwork in mind, don't trust your memory, trust Kanagira!
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          >
            <Button
              component={'a'}
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
              href={
                '/boards'
              }
            >
              Start now
            </Button>
            <Box
              marginTop={{ xs: 2, sm: 0 }}
              marginLeft={{ sm: 2 }}
              width={{ xs: '100%', md: 'auto' }}
            >
              <Button
                component={'a'}
                href={'http://localhost:8000/docs'}
                variant="outlined"
                color="primary"
                size="large"
                fullWidth={isMd ? false : true}
                target="_blank"
              >
                View documentation
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          height={'100%'}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box height={'100%'} width={'100%'} maxHeight={600}>
            <RocketIllustration width={'100%'} height={'100%'} />
          </Box>
        </Box>
      </Grid>
    </Grid>
    <Features />
    <Faq />
    <Contact />
    </>
  );
};
