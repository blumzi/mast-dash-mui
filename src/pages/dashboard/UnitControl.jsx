import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, ButtonGroup, List, ListItem, ListItemText, Pagination, Stack, Divider } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import axios from 'axios';
import config from '../../config';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const IntEnum = {
  0: 'Idle',
  1: 'Activity 1',
  2: 'Activity 2'
};

const UnitControl = () => {
  const unitStatus = {
    deployed: false,
    status: {}
  };
  const dummyStatus = {
    deployed: true,
    powered: true,
    detected: false,
    connected: false,
    operational: false,
    whyNotOperational: ['Because it', 'does not', 'exist yet'],
    activities: 0
  };
  const [allSites, setAllSites] = useState([config.sites['wis'], config.sites['ns']]);
  const [selectedSite, setSelectedSite] = useState(config.sites['wis']);
  const [allUnits, setAllUnits] = useState([...selectedSite.deployed, ...selectedSite.planned]);
  const [selectedUnit, setSelectedUnit] = useState(allUnits[0]);
  const [statuses, setStatuses] = useState(unitStatus);
  const [tabIndex, setTabIndex] = useState(0);
  const [ra, setRa] = useState('');
  const [dec, setDec] = useState('');
  const [seconds, setSeconds] = useState('');
  const handleRaChange = (event) => {
    setRa(event.target.value);
  };
  const handleDecChange = (event) => {
    setDec(event.target.value);
  };
  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };
  statuses['wis'] = [];
  statuses['wis']['mastw'] = dummyStatus;

  useEffect(() => {
    const fetchStatus = async () => {
      const url = `http://${selectedSite.controllerHost}/mast/api/v1/unit/${selectedUnit}/status`;
      try {
        const response = await axios.get(url);
        setUnitStatus(response.data || {});
      } catch (error) {
        console.error('Error fetching unit status (url: ${url}, error: ${error})');
      }
    };
    fetchStatus();
  }, [selectedUnit, selectedSite]);

  const parseCoordinates = (input) => {
    // Check if input contains ":" (indicating sexagesimal format)
    if (input.includes(':')) {
      const parts = input.split(':').map((part) => parseFloat(part.trim()));

      // Check if parts array has two elements (degrees and minutes)
      if (parts.length() === 1) {
        return parseInt(parts[0]);
      } else if (parts.length === 2) {
        const degrees = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        return degrees + minutes / 60; // Convert to decimal
      } else if (parts.length === 3) {
        // Check if parts array has three elements (degrees, minutes, and seconds)
        const degrees = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2]);
        return degrees + minutes / 60 + seconds / 3600; // Convert to decimal
      }
    } else {
      // If input is in decimal format, directly parse it
      return parseFloat(input);
    }

    // If input format is not recognized, return NaN
    return NaN;
  };

  const unitApi = async (method, ...params) => {
    const url = `http://${selectedSite.controllerHost}/mast/api/v1/unit/${selectedUnit}/${method}?${params.join('&')}`;
    try {
      const response = await axios.get(url);
      if ('exception' in response.data) {
        console.error(`url=${url}, exception=${response.data.exception}`);
      } else if ('error' in response.data) {
        console.error(`url=${url}, error=${response.data.error}`);
      } else {
        setUnitStatus(response.data.value || {});
      }
    } catch (error) {
      console.error('Error fetching unit status (url: ${url}, error: ${error})');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handlePageChange = (event, page) => {
    setTabIndex(page - 1);
    setSelectedUnit(allUnits[page - 1]);
  };

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  const handleSiteClick = (site, index) => {
    setSelectedSite(site);
    const units = [...site.deployed, ...site.planned];
    setAllUnits(units);
    setSelectedUnit(units[0]);
    renderUnitsList();
  };

  const handleMoveToCoordinates = () => {
    const raNumeric = parseCoordinates(ra);
    const decNumeric = parseCoordinates(dec);
    const s = `move_to_coordinates&ra=${raNumeric}&dec=${decNumeric}`;
    initiateApi(s);
  };

  const handleExpose = () => {
    const secondsNumeric = parseFloat(seconds);
    const s = `expose&seconds=${secondsNumeric}`;
    initiateApi(s);
  };

  const initiateApi = (method, ...params) => {
    console.log(`Initiating ${method} on ${selectedUnit}`);
    unitApi(method, params);
  };

  const renderUnitsList = () => (
    <Box sx={{ width: '100%' }}>
      <Typography variant={'h5'}>Sites</Typography>
      <Tabs onChange={handleTabChange} value={selectedSite.location}>
        {allSites.map((site, index) => (
          <Tab
            key={index}
            label={site.location}
            onClick={() => handleSiteClick(site, index)}
            color={site === selectedSite ? 'primary' : 'default'}
            value={site.name}
          />
        ))}
      </Tabs>
      <Typography variant={'h5'}>Units at &apos;{selectedSite.location}&apos;</Typography>
      <Tabs onChange={handleTabChange} value={selectedUnit} variant="scrollable" scrollButtons="auto">
        {allUnits.map((unit, index) => (
          <Tab
            key={index}
            label={unit}
            onClick={() => handleUnitClick(unit)}
            color={unit === selectedUnit ? 'primary' : 'default'}
            value={unit}
            maxWidth={50}
          />
        ))}
      </Tabs>
    </Box>
  );

  const renderMultilineText = (lines) => (
    <Box sx={{ lineHeight: 'small' }}>
      {lines.map((line, index) => {
        return (
          <Typography variant="body1" key={index} component={'div'} marginLeft={2}>
            {line}
          </Typography>
        );
      })}
      <br />
    </Box>
  );

  return (
    <Box>
      {renderUnitsList(selectedSite)}
      <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} useFlexGap>
        <br />
        <Typography variant="h5">Status of &apos;{selectedUnit}&apos;</Typography>
        <br />
        {selectedSite.deployed.includes(selectedUnit) ? (
          <>
            <FormGroup row>
              <FormControlLabel disabled="true" name="powered" control={<Checkbox checked={statuses.powered} />} label="Powered" />
              <FormControlLabel disabled="true" name="detected" control={<Checkbox checked={statuses.detected} />} label="Detected" />
              <FormControlLabel
                disabled="true"
                name="operational"
                control={<Checkbox checked={statuses.operational} />}
                label="Operational"
              />
            </FormGroup>
            <br />
            <FormGroup>
              {statuses.whyNotOperational && (
                <Box>
                  <Typography variant="h5">Why not Operational:</Typography>
                  {renderMultilineText(statuses.whyNotOperational)}
                </Box>
              )}
              <Typography variant="h5">Activities:</Typography>
              <Typography variant="body1" marginLeft={2}>
                {IntEnum[statuses.activities]}
              </Typography>
              <br />
            </FormGroup>
            <Typography variant="h5">Controls</Typography>
            <br />
            <Grid container rowSpacing={1} marginLeft={2} alignItems={'center'}>
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="text" disabled={!selectedSite.deployed.includes(selectedUnit)} onClick={() => initiateApi('startup')}>
                    Startup
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="text" disabled={!selectedSite.deployed.includes(selectedUnit)} onClick={() => initiateApi('shutdown')}>
                    Shutdown
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                  <Button
                    variant="text"
                    disabled={!selectedSite.deployed.includes(selectedUnit)}
                    onClick={() => initiateApi('start_autofocus')}
                  >
                    Start autofocus
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    disabled={!selectedSite.deployed.includes(selectedUnit)}
                    onClick={() => initiateApi('stop_autofocus')}
                  >
                    Stop autofocus
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems={'flex-end'}>
                <Grid item>
                  <Button variant="text" disabled={!selectedSite.deployed.includes(selectedUnit)} onClick={handleMoveToCoordinates}>
                    Move to Coordinates
                  </Button>
                </Grid>
                <Grid item>
                  <TextField
                    label={'RA'}
                    variant={'standard'}
                    disabled={!selectedSite.deployed.includes(selectedUnit)}
                    onChange={handleRaChange}
                    value={ra}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={'Dec'}
                    variant={'standard'}
                    disabled={!selectedSite.deployed.includes(selectedUnit)}
                    onChange={handleDecChange}
                    value={dec}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems={'flex-end'}>
                <Grid item>
                  <Button variant="text" disabled={!selectedSite.deployed.includes(selectedUnit)} onClick={handleExpose}>
                    Expose
                  </Button>
                </Grid>
                <Grid item>
                  <TextField
                    label={'Seconds'}
                    variant={'standard'}
                    disabled={!selectedSite.deployed.includes(selectedUnit)}
                    onChange={handleSecondsChange}
                    value={seconds}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h3">Not deployed yet</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default UnitControl;
