import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <Grid container spacing={2} className="container">
      <Grid item xs={12}>
        <Paper className="paper">
          <Typography variant="h5">contenido movil</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;