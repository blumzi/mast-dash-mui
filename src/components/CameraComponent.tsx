import { mastComponentRender } from './MastComponent';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { unitApi } from './Api';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext } from 'contexts/SitesContext';
import { isEmptyObject, renderMultilineText } from './Utils';
import RoundedButton from './RoundedButton';

export function CameraComponent() {
  const sitesContext = useSitesContext();
  const [seconds, setSeconds] = useState<number>(5);

  if (!sitesContext) {
    throw new Error('CameraComponent must be used within a SitesProvider');
  }

  let unitStatus;
  let cameraStatus;
  const { selectedUnitName: unit, status } = sitesContext;
  try {
    unitStatus = status[unit];
    cameraStatus = unitStatus.camera;
  } catch {
    return;
  }

  function renderConfig() {
    return <h6>Nothing yet</h6>;
  }

  function renderStatus() {
    if (isEmptyObject(sitesContext)) return;

    const operational = cameraStatus.operational ? 'yes' : 'no';
    const operationalColor = cameraStatus.operational ? 'success' : 'error';

    const whyNotOperational = cameraStatus.why_not_operational;

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
    // const disabled = !isDeployed(unit) || status[unit].type == 'short' || !status[unit].camera.operational;
    const disabled = false;

    return (
      <>
        <Stack>
          <RoundedButton
            variant="text"
            disabled={disabled}
            size="small"
            onClick={() => unitApi(unit, 'camera/expose', { seconds: seconds })}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Expose
          </RoundedButton>
        </Stack>
      </>
    );
  }

  return mastComponentRender('camera', unit, renderStatus, renderControls, renderConfig);
}

export default CameraComponent;
