import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import RemoveSharp from '@mui/icons-material/RemoveSharp';
import { Box } from '@mui/material';

interface CheckMarkProps {
  checked: boolean;
}

export function CheckMark({ checked }: CheckMarkProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 1,
        borderRadius: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 65,
          justifyContent: 'center',
          color: checked ? 'green' : 'red'
        }}
      >
        {checked ? <CheckIcon /> : <RemoveSharp />}
      </Box>
    </Box>
  );
}
