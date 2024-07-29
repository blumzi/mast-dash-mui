import { mastComponentRender } from './MastComponent';
import { Box, Button, FormControl, InputLabel, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { unitApi } from './Api';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext } from 'contexts/SitesContext';
import { isEmptyObject, renderMultilineText } from './Utils';
import { MenuItem, Select } from '@mui/base';

export function StageComponent() {
  const sitesContext = useSitesContext();
  const [preset, setPreset] = useState('');
  if (!sitesContext) {
    throw new Error('StageComponent must be used within a SitesProvider');
  }

  const { selectedUnitName: unit, status } = sitesContext;

  let unitStatus;
  let stageStatus;
  try {
    unitStatus = status[unit];
    stageStatus = unitStatus.stage;
  } catch {
    return;
  }

  function renderConfig() {
    return <h6>Nothing yet</h6>;
  }

  function renderStatus() {
    const status = sitesContext.status[unit];
    if (status === undefined || status.type == 'short') return;

    const stageStatus = sitesContext.status[unit].stage;

    const operational = stageStatus.operational ? 'yes' : 'no';
    const operationalColor = stageStatus.operational ? 'success' : 'error';

    const whyNotOperational = stageStatus.why_not_operational;

    return (
      <>
        <Box>
          <div style={{ display: 'flex', alignItems: 'left', textAlign: 'left' }}>
            <Stack>
              <FormGroup row>
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

  function renderControls() {
    if (isEmptyObject(sitesContext)) {
      return;
    }
    // const disabled = !isDeployed(unit) || status[unit].type == 'short' || !status[unit].stage.operational;
    const disabled = false;

    function handlePresetChange(event) {
      if (event !== null) {
        switch (event.target.value) {
          case 0:
            setPreset('Spectra');
            break;
          case 1:
            setPreset('Image');
            break;
        }
      }
    }

    return (
      <>
        <Stack>
          <FormControl component="fieldset">
            <InputLabel id="preset-label">Preset</InputLabel>
            <Select id={'preset-select'} value={preset} aria-label="Preset" onChange={handlePresetChange}>
              <MenuItem value={'Spectra'}>Spectra</MenuItem>
              <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="text"
            disabled={disabled}
            size="small"
            onClick={() => unitApi(unit, 'stage/move_to_preset', { preset: preset })}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Move to preset
          </Button>
          <Button
            variant="text"
            disabled={disabled}
            size="small"
            onClick={() => unitApi(unit, 'stage/close')}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Scoot
          </Button>
        </Stack>
      </>
    );
  }

  return mastComponentRender('stage', unit, renderStatus, renderControls, renderConfig);
}

export default StageComponent;
