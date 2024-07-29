import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Button,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableBody
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { isEmptyObject } from './Utils';
import { useSitesContext, isDeployed } from '../contexts/SitesContext';
import FormGroup from '@mui/material/FormGroup';
import { unitApi } from './Api';
import { CheckMark } from './Checkmark';

export function mastComponentActivities(stat) {
  if (isEmptyObject(stat) || !Object.keys(stat).includes('activities_verbal')) return null;

  let activities;
  if (stat.activities_verbal !== undefined) {
    activities = stat.activities_verbal;
    if (activities == '0') activities = 'Idle';
    else activities = stat.activities_verbal.replace(/^[^.]*./, '').replace(/:.*/, '');
  }

  return activities;
}
export function mastComponentRender(
  componentType: string,
  unitName: string,
  renderStatus: () => React.JSX.Element,
  renderControls: () => React.JSX.Element,
  renderConfig: () => React.JSX.Element
) {
  const sitesContext = useSitesContext();
  const { selectedSiteName: site, status } = sitesContext;
  let unitStatus;
  try {
    unitStatus = status[unitName];
  } catch (e) {
    return;
  }
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
        <Typography>{mastComponentActivities(stat)}</Typography>
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

  let activities: string | null = null;
  if (unitStatus.type === 'full') {
    if (unitStatus.type === 'full' && unitStatus.activities !== undefined) {
      activities = unitStatus.activities_verbal.replace(/^[^.]*./, '').replace(/:.*/, '');
      if (activities === '0') {
        activities = 'Idle';
      }
    }
  }

  const stat = renderStatus();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="baseline">
          {renderComponentSummary(componentType)}
        </Box>
      </AccordionSummary>

      {unitStatus.detected ? (
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {renderStatus && stat}
                {/*//{' '}*/}
                {/*<div>*/}
                {/*// /!*<Paper elevation={3}>*!/*/}
                {/*//{' '}*/}
                {/*<Typography variant={'h5'}>*/}
                {/*  // <u>{comp} status</u>*/}
                {/*//{' '}*/}
                {/*</Typography>*/}
                {/*// /!*<Box marginLeft={1}>*!/*/}
                {/*{renderStatus()}*/}
                {/*// <br />*/}
                {/*// /!*</Box>*!/*/}
                {/*//{' '}*/}
                {/*</Paper>*/}
                {/*// <br />*/}
                {/*//{' '}*/}
                {/*</div>*/}
                {/*)}*/}
                <div>
                  <Paper elevation={3}>
                    <Typography style={{ fontWeight: 'bold' }}>
                      <u>Generic controls</u>
                    </Typography>
                    <FormGroup>
                      <FormGroup row>
                        <Typography sx={{ width: '100px' }}>&nbsp;</Typography>
                        {mastComponentRenderGlobalControls(componentType, unitName)}
                        <br />
                      </FormGroup>
                    </FormGroup>
                  </Paper>
                  <br />
                </div>
                {renderControls && (
                  <div>
                    <Paper elevation={3}>
                      <Typography style={{ fontWeight: 'bold' }}>
                        <u>{comp} controls</u>
                      </Typography>
                      <Box marginLeft={1}>{renderControls()}</Box>
                      <br />
                    </Paper>
                    <br />
                  </div>
                )}
                {renderConfig && (
                  <div>
                    <Paper elevation={3}>
                      <Typography style={{ fontWeight: 'bold' }}>
                        <u>{comp} configuration</u>
                      </Typography>
                      <Box marginLeft={1}>{renderConfig()}</Box>
                      <br />
                    </Paper>
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      ) : (
        <Typography variant="body1" color="error" sx={{ margin: '10px 0', textAlign: 'center' }}>
          Unit &apos;{unitName}&apos; was not detected (yet?) by &apos;mast-{site}-control&apos;
        </Typography>
      )}
    </Accordion>
  );
}

export function mastComponentRenderGlobalControls(componentType: string, unitName: string) {
  const component = componentType == 'unit' ? '' : componentType + '/';

  return (
    <>
      <Box>
        <FormGroup row>
          <Button
            variant="text"
            // disabled={disabled}
            size="small"
            onClick={() => unitApi(unitName, `${component}startup`)}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Startup
          </Button>
          <Button
            variant="text"
            // disabled={disabled}
            size="small"
            onClick={() => unitApi(unitName, '${component}shutdown')}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Shutdown
          </Button>
          <Button
            variant="text"
            // disabled={disabled}
            size="small"
            onClick={() => unitApi(unitName, '${component}abort')}
            sx={{ justifyContent: 'flex-start', width: '100px' }}
          >
            Abort
          </Button>
        </FormGroup>
      </Box>
    </>
  );
}
export default mastComponentRender;
