import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  borderColor: theme.palette.primary.main,
  '&hover': {
    borderColor: theme.palette.primary.dark,
    color: theme.palette.secondary.dark
  }
}));

export default RoundedButton;
