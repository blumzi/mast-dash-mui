import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export function Notification({ message, severity }) {
  // const [notification, setNotification] = useState({
  //   open: false,
  //   message: '',
  //   severity: 'success'
  // });
  const [open, setOpen] = useState(true);

  const handleCloseNotification = (event) => {
    if (event) event.preventDefault;
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseNotification}>
      <Alert onClose={handleCloseNotification} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
