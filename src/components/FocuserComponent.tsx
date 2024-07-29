import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { unitApi } from './Api';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext } from 'contexts/SitesContext';
import { mastComponentRender } from './MastComponent';
import { renderMultilineText, isEmptyObject } from './Utils';

export function FocuserComponent() {
  const sitesContext = useSitesContext();
  const [position, setPosition] = useState(0);
  const [positionsPerStep, setPositionsPerStep] = useState(5);

  if (!sitesContext) {
    throw new Error('FocuserComponent must be used within a SitesProvider');
  }

  if (isEmptyObject(sitesContext.status)) return;

  const { selectedUnitName: unit, status } = sitesContext;

  let unitStatus;
  let focuserStatus;
  try {
    unitStatus = status[unit];
    focuserStatus = unitStatus.focuser;
  } catch {
    return;
  }

  function handlePositionChange(event) {
    setPosition(parseInt(event.target.value));
  }

  function handlePositionsPerStepChange(event) {
    setPositionsPerStep(parseInt(event.target.value));
  }

  function renderConfig() {
    return <>Nothing yet</>;
  }

  function renderStatus() {
    if (status[unit].type === 'short' || isEmptyObject(status[unit].focuser)) return;

    const operational = focuserStatus.operational ? 'yes' : 'no';
    const operationalColor = focuserStatus.operational ? 'success' : 'error';

    const whyNotOperational = focuserStatus.why_not_operational;

    return (
      <>
        <table border={0}>
          {/*<caption style={{ captionSide: 'top', fontWeight: 'bold' }}>Focuser status</caption>*/}
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Operational</td>
              <td style={{ color: operationalColor }}>{operational}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Why</td>
              <td>{renderMultilineText(whyNotOperational)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Current position</td>
              <td>{focuserStatus.position}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Optimal position</td>
              <td>{focuserStatus.known_as_good_position}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  function renderControls() {
    if (isEmptyObject(sitesContext)) {
      return;
    }
    // const disabled = !isDeployed(unit) || status[unit].type == 'short' || !status[unit].focuser.operational;
    const disabled = false;
    if (!isEmptyObject(focuserStatus)) setPosition(focuserStatus.position);

    return (
      <>
        <FormGroup>
          <FormGroup row>
            <Typography>Move</Typography>
          </FormGroup>
          <FormGroup row>
            <Box display={'flex'} alignItems={'baseline'}>
              <Button
                variant="text"
                disabled={disabled}
                size="small"
                onClick={() => unitApi(unit, 'focuser/goto', { position: position })}
                sx={{ justifyContent: 'flex-start', width: '140px', marginLeft: 1 }}
              >
                To position
              </Button>
              <TextField disabled={disabled} label={'Position'} variant={'standard'} onChange={handlePositionChange} value={position} />
            </Box>
          </FormGroup>

          <FormGroup row>
            <Box display="flex" alignItems={'baseline'}>
              <Button
                variant="text"
                disabled={disabled}
                size="small"
                onClick={() => unitApi(unit, 'focuser/move', { amount: positionsPerStep, direction: 0 })}
                sx={{ justifyContent: 'flex-start', width: '5px', marginLeft: 1 }}
              >
                In
              </Button>
              <Button
                variant="text"
                disabled={disabled}
                size="small"
                onClick={() => unitApi(unit, 'focuser/move', { amount: positionsPerStep, direction: 1 })}
                sx={{ justifyContent: 'flex-start', width: '5px', marginLeft: 1 }}
              >
                Out
              </Button>
              <TextField
                disabled={disabled}
                label={'Positions'}
                variant={'standard'}
                onChange={handlePositionsPerStepChange}
                value={positionsPerStep}
              />
            </Box>
          </FormGroup>
          <FormGroup row>
            <Button
              variant="text"
              disabled={disabled}
              size="small"
              onClick={() => unitApi(unit, 'focuser/goto_known_as_good_position')}
              sx={{ justifyContent: 'flex-start', width: '180px', marginLeft: 1, textTransform: 'none' }}
            >
              To known as good position
            </Button>
          </FormGroup>
        </FormGroup>
      </>
    );
  }

  return mastComponentRender('focuser', unit, renderStatus, renderControls, renderConfig);
}

export default FocuserComponent;
