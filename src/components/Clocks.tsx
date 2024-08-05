import React, { useEffect, useState } from 'react';
import { Typography, Container, Stack } from '@mui/material';

const Clocks = () => {
  const [localTime, setLocalTime] = useState(new Date());
  const [utcTime, setUtcTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalTime(new Date());
      setUtcTime(new Date(new Date().toUTCString()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container>
      <Stack display={'flex'} flexDirection={'row'} alignItems={'baseline'}>
        <Typography variant="h6">{utcTime.toDateString()}&nbsp;&nbsp;</Typography>
        <Typography variant={'h5'}>UT:&nbsp;</Typography>
        <Typography variant="h6">{formatTime(utcTime)}&nbsp;&nbsp;</Typography>
        <Typography variant={'h5'}>LT:&nbsp;</Typography>
        <Typography variant="h6">{localTime.toLocaleTimeString()}</Typography>
      </Stack>
    </Container>
  );
};

export default Clocks;
