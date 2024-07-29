import { mastComponentRender } from './MastComponent';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { unitApi } from './Api';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import { isEmptyObject, parseCoordinates } from './Utils';
import { useSitesContext } from 'contexts/SitesContext';
import { renderMultilineText } from './Utils';

export function MountComponent() {
  const sitesContext = useSitesContext();
  const [ra, setRa] = useState(0);
  const [dec, setDec] = useState(0);
  if (!sitesContext) {
    throw new Error('MountComponent must be used within a SitesProvider');
  }
  const { selectedUnitName: unit, status } = sitesContext;

  let unitStatus;
  let mountStatus;
  try {
    unitStatus = status[unit];
    mountStatus = unitStatus.mount;
  } catch {
    return;
  }

  function handleRaChange(event) {
    setRa(event.target.value);
  }

  function handleDecChange(event) {
    setDec(event.target.value);
  }

  function handleMoveToCoordinates() {
    const raNumeric = parseCoordinates(ra);
    const decNumeric = parseCoordinates(dec);
    void unitApi(unit, 'mount/move_to_coordinates', { ra: raNumeric, dec: decNumeric });
  }

  function renderConfig() {
    return <>Nothing yet</>;
  }

  function renderControls() {
    if (isEmptyObject(sitesContext)) {
      return;
    }
    const disabled = false;

    return (
      <>
        <FormGroup>
          {/*<FormGroup row>*/}
          <Box display="flex" alignItems="baseline">
            <Typography sx={{ width: '80px' }}>Tracking</Typography>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(unit, 'mount/start_tracking')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Start
            </Button>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(unit, 'mount/stop_tracking')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Stop
            </Button>
          </Box>
          {/*</FormGroup>*/}
          <FormGroup row>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(unit, 'mount/park')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Park
            </Button>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(unit, 'mount/find_home')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Find home
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={handleMoveToCoordinates}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Go to
            </Button>
            <TextField label={'RA'} variant={'standard'} disabled={disabled} onChange={handleRaChange} value={ra} />
            &nbsp; &nbsp; &nbsp;
            <TextField label={'Dec'} variant={'standard'} disabled={disabled} onChange={handleDecChange} value={dec} />
          </FormGroup>
        </FormGroup>
      </>
    );
  }

  function renderStatus() {
    const operational = mountStatus.operational ? 'yes' : 'no';
    const operationalColor = mountStatus.operational ? 'success' : 'error';

    const whyNotOperational = mountStatus.why_not_operational;

    return (
      <>
        <Box>
          <div style={{ display: 'flex', alignItems: 'left', textAlign: 'left' }}>
            <Stack>
              <FormGroup row>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Typography color="success" sx={{ width: '100px', textAlign: 'left' }}>
                  Operational
                </Typography>
                <Typography color={operationalColor} sx={{ width: '100px', textAlign: 'left' }}>
                  {operational}
                </Typography>
              </FormGroup>
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
            </Stack>
          </div>
        </Box>
      </>
    );
  }

  return mastComponentRender('mount', unit, renderStatus, renderControls, renderConfig);
}

export default MountComponent;
