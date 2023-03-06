import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToken } from './auth.js';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function BoardForm() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const { token } = useToken();
  if (!token) {
    return <div>Please Log In</div>;
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = name;

    const boardsUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards`;
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(boardsUrl, fetchConfig);
    if (response.ok) {
      const entry = await response.json();
      navigate(`/boards/${entry.board_id}/view`, { replace: true });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Create Board
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "#fff",
                backgroundColor: "#272D35",
                "&:hover": {
                  backgroundColor: "#BDBDBD",
                  color: "#272D35",
                },
              }}
            >
              Create Board
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BoardForm;
