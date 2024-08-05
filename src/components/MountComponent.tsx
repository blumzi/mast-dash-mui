import { mastComponentRender } from './MastComponent';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { unitApi } from './Api';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import { isEmptyObject, parseCoordinates } from './Utils';
import { useSitesContext } from '../contexts/SitesContext';
import { useUnitConfigContext } from '../contexts/UnitConfigContext';
import { renderMultilineText } from './Utils';
import { useUnitStatusContext } from '../contexts/UnitStatusContext';

export function MountComponent() {
  const { selectedUnit, selectedSite } = useSitesContext();
  const { statuses } = useUnitStatusContext();
  const { configs } = useUnitConfigContext();

  const [ra, setRa] = useState(0);
  const [dec, setDec] = useState(0);

  const unitStatus = statuses[selectedUnit];
  const unitConfig: never = configs[selectedUnit];

  const mountStatus = unitStatus.mount;

  // let unitStatus;
  // let mountStatus;
  // try {
  //   unitStatus = status[unit];
  //   mountStatus = unitStatus.mount;
  // } catch {
  //   return;
  // }

  function handleRaChange(event) {
    setRa(event.target.value);
  }

  function handleDecChange(event) {
    setDec(event.target.value);
  }

  function handleMoveToCoordinates() {
    const raNumeric = parseCoordinates(ra);
    const decNumeric = parseCoordinates(dec);
    void unitApi(selectedUnit, 'mount/move_to_coordinates', { ra: raNumeric, dec: decNumeric });
  }

  function renderConfig() {
    return <>Nothing yet</>;
  }

  function renderControls() {
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
              onClick={() => unitApi(selectedUnit, 'mount/start_tracking')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Start
            </Button>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(selectedUnit, 'mount/stop_tracking')}
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
              onClick={() => unitApi(selectedUnit, 'mount/park')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Park
            </Button>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(selectedUnit, 'mount/find_home')}
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

  function renderDetails() {}

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
                {}
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

  return mastComponentRender('mount', selectedUnit, renderStatus, renderControls, renderConfig);
}

export default MountComponent;
