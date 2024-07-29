import { Box, Button, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { unitApi, controlApi } from './Api';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext, isDeployed } from 'contexts/SitesContext';
import { mastComponentRender } from './MastComponent';
import { isEmptyObject, renderMultilineText } from './Utils';

export function UnitComponent() {
  // const sitesContext = useSitesContext();
  const { selectedUnitName: unit, selectedSiteName: site, status, setStatus, deployedUnits } = useSitesContext();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    fetchAllDeployedStatuses();

    const intervalId = setInterval(fetchAllDeployedStatuses, 10000);
    return () => clearInterval(intervalId);
  }, [fetchAllDeployedStatuses, deployedUnits]);

  // if (!sitesContext) {
  //   throw new Error('UnitComponent must be used within a SitesProvider');
  // }

  let unitStatus;
  try {
    unitStatus = status[unit];
  } catch {
    return;
  }

  function fetchAllDeployedStatuses() {
    console.log(`deployedUnits: [${deployedUnits}]`);
    for (const unitId in deployedUnits) {
      fetchUnitStatus(deployedUnits[unitId]);
    }
  }

  function fetchUnitStatus(uName) {
    // first get a short status from the controller
    controlApi(site, `unit/${uName}/minimal_status`)
      .then((shortStatus) => {
        if (shortStatus.detected) {
          // the unit is accessible, get the full status
          unitApi(uName, 'status').then((fullStatus) => {
            setStatus((prevStatus) => ({ ...prevStatus, [uName]: fullStatus }));
          });
        } else {
          // keep the mini status
          shortStatus.type = 'short';
          setStatus((prevStatus) => ({ ...prevStatus, [uName]: shortStatus }));
        }
      })
      .catch(() => {
        setStatus((prevStatus) => ({ ...prevStatus, [uName]: { type: 'short', detected: false, powered: false } }));
      });
  }

  function handleSecondsChange(event) {
    setSeconds(parseFloat(event.target.value));
  }

  function handleExpose() {
    void unitApi(unit, 'expose', { seconds: seconds });
  }

  function renderConfig() {
    return <>Nothing yet</>;
  }

  function renderControls() {
    const disabled = !isDeployed(unit);

    return (
      <>
        <FormGroup>
          <FormGroup row>
            <Box display="flex" alignItems="baseline">
              <Typography sx={{ width: '100px' }}>Guiding:</Typography>
              <Button
                disabled={disabled}
                variant="text"
                onClick={() => unitApi(unit, 'start_guiding')}
                sx={{ justifyContent: 'flex-start' }}
              >
                Start
              </Button>
              <Button
                disabled={disabled}
                variant="text"
                onClick={() => unitApi(unit, 'stop_guiding')}
                sx={{ justifyContent: 'flex-start' }}
              >
                Stop
              </Button>
            </Box>
          </FormGroup>
          <FormGroup row>
            <Box display="flex" alignItems="baseline">
              <Typography sx={{ width: '100px' }}>Autofocus:</Typography>
              <Button
                disabled={disabled}
                variant="text"
                onClick={() => unitApi(unit, 'start_autofocus')}
                sx={{ justifyContent: 'flex-start' }}
              >
                Start
              </Button>
              <Button
                disabled={disabled}
                variant="text"
                onClick={() => unitApi(unit, 'stop_autofocus')}
                sx={{ justifyContent: 'flex-start' }}
              >
                Stop
              </Button>
            </Box>
          </FormGroup>
          <FormGroup row>
            <Typography sx={{ width: '100px' }}>&nbsp;</Typography>
            <Box display="flex" alignItems="baseline">
              <Button disabled={disabled} variant="text" onClick={handleExpose} sx={{ justifyContent: 'flex-start' }}>
                Expose
              </Button>
              <TextField disabled={disabled} label={'Seconds'} variant={'standard'} onChange={handleSecondsChange} value={seconds} />
            </Box>
          </FormGroup>
        </FormGroup>
      </>
    );
  }

  function renderStatus() {
    if (unitStatus === undefined || unitStatus.type == 'short') return;

    const operational = unitStatus.operational ? 'yes' : 'no';
    const operationalColor = unitStatus.operational ? 'success' : 'error';

    const whyNotOperational = unitStatus.why_not_operational;

    return (
      <>
        {/*<Box>*/}
        {/*  <div style={{ display: 'flex', alignItems: 'left', textAlign: 'left' }}>*/}
        {/*    <Stack>*/}
        {/*      <FormGroup row>*/}
        {/*        <Typography color="success" sx={{ width: '100px', textAlign: 'left' }}>*/}
        <TableRow>
          <TableCell sx={{ width: '10px' }}>Hiho</TableCell>
          <TableCell sx={{ width: '50px' }}>Operational</TableCell>
          {/*</Typography>*/}
          {/*<Typography color={operationalColor} sx={{ width: '100px', textAlign: 'left' }}>*/}
          <TableCell sx={{ width: '100px' }}>
            <Typography color={operationalColor} sx={{ width: '100px', textAlign: 'left' }}>
              {operational}
            </Typography>
          </TableCell>
        </TableRow>
        {/*  </Typography>*/}
        {/*</FormGroup>*/}
        {whyNotOperational && (
          <FormGroup row>
            <Typography color="success" sx={{ width: '100px', alignItems: 'left', textAlign: 'left' }}>
              Why
            </Typography>
            <Typography color={operationalColor} sx={{ width: '300px', alignItems: 'left', textAlign: 'left' }}>
              {renderMultilineText(whyNotOperational)}
            </Typography>
          </FormGroup>
        )}
        {/*    </Stack>*/}
        {/*  </div>*/}
        {/*</Box>*/}
      </>
    );
  }

  if (!isEmptyObject(unitStatus)) return mastComponentRender('unit', unit, renderStatus, renderControls, renderConfig);
}

export default UnitComponent;
