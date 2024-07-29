import { mastComponentRender } from './MastComponent';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { unitApi } from './Api';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext } from 'contexts/SitesContext';
import { isEmptyObject, renderMultilineText } from './Utils';

export function CoversComponent() {
  const sitesContext = useSitesContext();
  if (!sitesContext) {
    throw new Error('CoversComponent must be used within a SitesProvider');
  }

  const { selectedUnitName: unit, status } = sitesContext;
  let unitStatus: any;
  let coversStatus: any;
  try {
    unitStatus = status[unit];
    coversStatus = unitStatus.covers;
  } catch {
    return;
  }

  function renderConfig() {
    return <h6>Nothing yet</h6>;
  }

  function renderStatus() {
    const operational = coversStatus.operational ? 'yes' : 'no';
    const operationalColor = coversStatus.operational ? 'success' : 'error';

    const whyNotOperational = coversStatus.why_not_operational;

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
    // const disabled = !isDeployed(unit) || status[unit].type == 'short' || !status[unit].covers.operational;
    const disabled = false;

    return (
      <>
        <Stack>
          <Button
            variant="text"
            disabled={disabled}
            size="small"
            onClick={() => unitApi(unit, 'covers/open')}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Open
          </Button>
          <Button
            variant="text"
            disabled={disabled}
            size="small"
            onClick={() => unitApi(unit, 'covers/close')}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Close
          </Button>
        </Stack>
      </>
    );
  }

  return mastComponentRender('covers', unit, renderStatus, renderControls, renderConfig);
}

export default CoversComponent;
