import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { isEmptyObject } from './Utils';
import { useSitesContext, isDeployed } from '../contexts/SitesContext';
import { useUnitStatusContext } from '../contexts/UnitStatusContext';
import FormGroup from '@mui/material/FormGroup';
import { unitApi } from './Api';
import { CheckMark } from './Checkmark';

export function mastComponentActivities() {
  const { selectedUnit } = useSitesContext();
  const { statuses } = useUnitStatusContext();

  if (isEmptyObject(statuses[selectedUnit])) return;
  const unitStatus = statuses[selectedUnit];
  if (isEmptyObject(unitStatus) || !Object.keys(unitStatus).includes('activities_verbal')) return null;

  let activities;
  if (unitStatus.activities_verbal !== undefined) {
    activities = unitStatus.activities_verbal;
    if (activities == '0') activities = 'Idle';
    else activities = unitStatus.activities_verbal.replace(/^[^.]*./, '').replace(/:.*/, '');
  }

  return activities;
}
export function mastComponentRender(componentType: string, unitName: string, renderDetails: () => React.JSX.Element) {
  const { selectedSite, selectedUnit } = useSitesContext();
  const { statuses } = useUnitStatusContext();
  const unitStatus = statuses[selectedUnit];

  if (isEmptyObject(statuses[selectedUnit])) return;

  const comp = componentType.charAt(0).toUpperCase() + componentType.slice(1);

  function renderComponentSummary(compType: string) {
    let stat;

    if (unitStatus.type === 'short') {
      stat = unitStatus;
    } else {
      switch (compType) {
        case 'unit':
          stat = unitStatus;
          break;
        case 'mount':
          stat = unitStatus.mount;
          break;
        case 'focuser':
          stat = unitStatus.focuser;
          break;
        case 'stage':
          stat = unitStatus.stage;
          break;
        case 'camera':
          stat = unitStatus.camera;
          break;
        case 'covers':
          stat = unitStatus.covers;
          break;
      }
    }

    const powered = stat.powered;
    const detected = stat.detected;
    const operational = stat.operational !== undefined ? stat.operational : false;

    return (
      <FormGroup sx={{ display: 'flex', alignItems: 'baseline' }} row>
        <Typography sx={{ width: 80 }}>{comp}</Typography>
        <CheckMark checked={powered} />
        <CheckMark checked={detected} />
        <CheckMark checked={operational} />
        <Typography>{mastComponentActivities()}</Typography>
      </FormGroup>
    );
  }

  if (isEmptyObject(unitName)) {
    return;
  }

  if (!isDeployed(unitName)) {
    return (
      <Typography variant="body1" color="error" sx={{ margin: '10px 0', textAlign: 'center' }}>
        <b>{unitName}</b> is not deployed.
      </Typography>
    );
  }

  if (isEmptyObject(unitStatus)) {
    return;
  }

  if (!unitStatus.powered || !unitStatus.detected) return;

  let activities: string | null = null;
  if (unitStatus.type === 'full') {
    if (unitStatus.type === 'full' && unitStatus.activities !== undefined) {
      activities = unitStatus.activities_verbal.replace(/^[^.]*./, '').replace(/:.*/, '');
      if (activities === '0') {
        activities = 'Idle';
      }
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: '20px',
          '&.Mui-expanded': {
            minHeight: '20px'
          },
          '.MuiAccordionSummary-content': {
            margin: '8px 0' // Adjust the margin to control the content spacing
          }
        }}
      >
        <Box display="flex" alignItems="baseline">
          {renderComponentSummary(componentType)}
        </Box>
      </AccordionSummary>

      {unitStatus.detected ? (
        <AccordionDetails>{renderDetails()}</AccordionDetails>
      ) : (
        <Typography variant="body1" color="error" sx={{ margin: '10px 0', textAlign: 'center' }}>
          Unit &apos;{unitName}&apos; was not detected (yet?) by &apos;mast-{selectedSite.name}-control&apos;
        </Typography>
      )}
    </Accordion>
  );
}

export default mastComponentRender;
