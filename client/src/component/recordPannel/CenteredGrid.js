import React, { useContext, useState, useEffect } from 'react';
import Input from './Input';
import FetchRecord from './FetchRecord';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import InputContext from '../../context/input/inputContext';

export default function CenteredGrid() {
  const inputContext = useContext(InputContext);
  const { type } = inputContext;

  return (
    <Grid container spacing={2}>
      {type !== 'transactions' && (
        <Fade timeout={1000} in={true}>
          <Grid item xs={12}>
            <Input />
          </Grid>
        </Fade>
      )}
      <Fade timeout={1000} in={true}>
        <Grid item xs={12}>
          <FetchRecord />
        </Grid>
      </Fade>
    </Grid>
  );
}
