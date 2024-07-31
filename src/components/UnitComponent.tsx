import { Box, TableCell, TableRow, TextField, Typography, Chip } from '@mui/material';
import React, { useState } from 'react';
import { unitApi } from './Api';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext, isDeployed } from '../contexts/SitesContext';
import { useUnitStatusContext } from '../contexts/UnitStatusContext';
import { mastComponentRender } from './MastComponent';
import { isEmptyObject, renderMultilineText } from './Utils';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody } from '@mui/material';
import { MastRow } from './MastTable';

export function UnitComponent() {
  const { selectedUnit } = useSitesContext();
  const { statuses } = useUnitStatusContext();
  const [seconds, setSeconds] = useState(0);
  const unitStatus = statuses[selectedUnit];

  if (isEmptyObject(statuses[selectedUnit])) return;

  function handleSecondsChange(event) {
    setSeconds(parseFloat(event.target.value));
  }

  function handleExpose() {
    void unitApi(selectedUnit, 'expose', { seconds: seconds });
  }

  function renderConfig() {
    return <>Nothing yet</>;
  }

  function renderControls() {
    const disabled = !isDeployed(selectedUnit);

    return (
      <>
        <Paper sx={{ marginLeft: '1%', width: '50%', elevation: '0' }}>
          <TableContainer>
            <TableBody>
              <MastRow>
                <Typography>Guiding</Typography>
                <Chip
                  variant="outlined"
                  disabled={disabled}
                  size="small"
                  onClick={() => unitApi(selectedUnit, 'start_guiding')}
                  sx={{ justifyContent: 'flex-start' }}
                  label="Start"
                />
                <Chip
                  variant="outlined"
                  disabled={disabled}
                  size="small"
                  onClick={() => unitApi(selectedUnit, 'stop_guiding')}
                  sx={{ justifyContent: 'flex-start' }}
                  label={'Stop'}
                />
                <Typography />
              </MastRow>
              <MastRow>
                <Typography>Autofocus</Typography>
                <Chip
                  variant="outlined"
                  disabled={disabled}
                  size="small"
                  onClick={() => unitApi(selectedUnit, 'start_autofocus')}
                  sx={{ justifyContent: 'flex-start' }}
                  label={'Start'}
                />
                <Chip
                  variant="outlined"
                  disabled={disabled}
                  size="small"
                  onClick={() => unitApi(selectedUnit, 'stop_autofocus')}
                  sx={{ justifyContent: 'flex-start' }}
                  label={'Stop'}
                />
                <Typography />
              </MastRow>
              <MastRow>
                <Typography />
                <Chip
                  variant="outlined"
                  disabled={disabled}
                  size="small"
                  onClick={handleExpose}
                  sx={{ justifyContent: 'flex-start' }}
                  label="Expose"
                />
                <TextField disabled={disabled} label={'Seconds'} variant={'standard'} onChange={handleSecondsChange} value={seconds} />
                <Typography />
              </MastRow>
            </TableBody>
          </TableContainer>
        </Paper>
      </>
    );
  }

  const operational = unitStatus.operational ? 'yes' : 'no';
  const operationalColor = unitStatus.operational ? 'success' : 'error';
  const whyNotOperational: string[] = unitStatus.why_not_operational;

  if (!isEmptyObject(unitStatus)) return mastComponentRender('unit', selectedUnit, renderDetails);

  function renderDetails() {
    return (
      <div>
        <Typography variant="h5">Status</Typography>
        <Paper sx={{ marginLeft: '1%', width: '50%', elevation: '0' }}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table" sx={{ border: 'none' }}>
              <TableBody>
                <MastRow>
                  <Typography>Operational</Typography>
                  <Typography color={operationalColor}>{operational}</Typography>
                  <Typography />
                  <Typography />
                </MastRow>
                <MastRow>
                  <Typography>Why</Typography>
                  <div>
                    {whyNotOperational.map((line) => (
                      <Typography color={operationalColor}>{line}</Typography>
                    ))}
                  </div>
                  <Typography />
                  <Typography />
                </MastRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <br />
        <Typography variant="h5">Controls</Typography>
        {renderControls()}
      </div>
    );
  }
}

export default UnitComponent;
