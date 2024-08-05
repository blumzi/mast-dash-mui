import { TextField, Typography, Chip, Card, Divider } from '@mui/material';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { controlApi, unitApi } from './Api';
import { useSitesContext, isDeployed } from '../contexts/SitesContext';
import { useUnitStatusContext } from '../contexts/UnitStatusContext';
import { useUnitConfigContext } from '../contexts/UnitConfigContext';
import { mastComponentRender } from './MastComponent';
import { isEmptyObject } from './Utils';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody } from '@mui/material';
import { MastRow, MastEmptyCell } from './MastTable';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

type GuidingConfig = {
  binning: number;
  interval: number;
  exposure: number;
  gain: number;
  min_ra_correction_arcsec: number;
  min_dec_correction_arcsec: number;
};

type AutofocusConfig = {
  binning: number;
  exposure: number;
  images: number;
  spacing: number;
};

export function UnitComponent() {
  const { selectedUnit, selectedSite } = useSitesContext();
  const { statuses } = useUnitStatusContext();
  const { configs } = useUnitConfigContext();
  const [unitConfigCopy, setUnitConfigCopy] = useState(structuredClone(configs[selectedUnit]));
  useEffect(() => {
    setUnitConfigCopy(structuredClone(unitConfig));
  }, [configs[selectedUnit]]);

  const unitStatus = statuses[selectedUnit];
  const unitConfig: never = configs[selectedUnit];

  // Function to update a specific property of the guidingConfig state
  const saveConfig = () => {
    controlApi(selectedSite, `config/set_unit/${selectedUnit}`, unitConfigCopy);
  };

  if (isEmptyObject(statuses[selectedUnit])) return;

  function updateGuidingConfigCopy(field: string, value: number) {
    setUnitConfigCopy((prevConfig) => ({
      ...prevConfig,
      guiding: {
        ...prevConfig.guiding,
        [field]: value
      }
    }));
  }
  function updateAutofocusConfigCopy(field: string, value: number) {
    setUnitConfigCopy((prevConfig) => ({
      ...prevConfig,
      guiding: {
        ...prevConfig.autofocus,
        [field]: value
      }
    }));
  }

  function renderConfig() {
    const canUpdateConfig: boolean = true;

    function validateBinning(binning: string) {
      let b: number;
      try {
        b = parseInt(binning, 10);
        if (b === 1 || b === 2 || b === 4) return null;
        else return 'Either 1, 2 or 4';
      } catch (e) {
        return e;
      }
    }
    function handleGuidingBinningChange(event: ChangeEvent<HTMLInputElement>) {
      const err = validateBinning(event.target.value);
      if (err === null) {
        event.target.color = 'success';
        event.target.focused = true;
        // updateGuidingConfigCopy('binning', parseInt(event.target.value));
      } else {
        event.target.color = 'error';
        event.target.focused = true;
      }
    }
    function handleGuidingIntervalChange(event: ChangeEvent<HTMLInputElement>) {
      updateGuidingConfigCopy('interval', parseFloat(event.target.value));
    }
    function handleGuidingExposureChange(event: ChangeEvent<HTMLInputElement>) {
      updateGuidingConfigCopy('exposure', parseFloat(event.target.value));
    }
    function handleGuidingGainChange(event: ChangeEvent<HTMLInputElement>) {
      updateGuidingConfigCopy('gain', parseFloat(event.target.value));
    }
    function handleGuidingMinRaCorrectionChange(event: ChangeEvent<HTMLInputElement>) {
      updateGuidingConfigCopy('min_ra_correction_arcsec', parseFloat(event.target.value));
    }
    function handleGuidingMinDecCorrectionChange(event: ChangeEvent<HTMLInputElement>) {
      updateGuidingConfigCopy('min_dec_correction_arcsec', parseFloat(event.target.value));
    }
    function handleAutofocusBinningChange(event: ChangeEvent<HTMLInputElement>) {
      updateAutofocusConfigCopy('binning', parseInt(event.target.value));
    }
    function handleAutofocusExposureChange(event: ChangeEvent<HTMLInputElement>) {
      updateAutofocusConfigCopy('exposure', parseFloat(event.target.value));
    }
    function handleAutofocusImagesChange(event: ChangeEvent<HTMLInputElement>) {
      updateAutofocusConfigCopy('images', parseInt(event.target.value));
    }
    function handleAutofocusSpacingChange(event: ChangeEvent<HTMLInputElement>) {
      updateAutofocusConfigCopy('spacing', parseInt(event.target.value));
    }

    return (
      <>
        <br />
        <Card sx={{ marginLeft: '1%' }}>
          <Typography variant="h5">Configuration</Typography>
          <Stack direction="row">
            <Paper sx={{ width: '45%' }}>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {/* Guiding configuration */}
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <Typography variant="h5" component="div">
                        Guiding
                      </Typography>
                      <MastEmptyCell />
                      <MastEmptyCell />
                      <MastEmptyCell />
                    </MastRow>
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <MastEmptyCell />
                      <Tooltip arrow title={'Either 1, 2 or 4'} placement="top">
                        <TextField
                          disabled={!canUpdateConfig}
                          label={'Binning'}
                          variant={'outlined'}
                          onChange={handleGuidingBinningChange}
                          value={unitConfigCopy.guiding.binning}
                          size={'small'}
                        />
                      </Tooltip>
                      <Tooltip arrow placement={'top'} title={'Between exposures'}>
                        <TextField
                          color={'success'}
                          focused
                          disabled={!canUpdateConfig}
                          label={'Interval'}
                          variant={'outlined'}
                          onChange={handleGuidingIntervalChange}
                          value={unitConfigCopy.guiding.interval}
                          size={'small'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment id="sec" position="end">
                                sec
                              </InputAdornment>
                            )
                          }}
                        />
                      </Tooltip>
                      <MastEmptyCell />
                    </MastRow>
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <MastEmptyCell />
                      <TextField
                        disabled={!canUpdateConfig}
                        label={'Exposure'}
                        variant={'outlined'}
                        onChange={handleGuidingExposureChange}
                        value={unitConfigCopy.guiding.exposure}
                        size={'small'}
                        id={'guiding-exposure'}
                        InputProps={{
                          endAdornment: <InputAdornment position={'end'}>sec</InputAdornment>
                        }}
                      />
                      <TextField
                        disabled={!canUpdateConfig}
                        label={'Gain'}
                        variant={'outlined'}
                        onChange={handleGuidingGainChange}
                        value={unitConfigCopy.guiding.gain}
                        size={'small'}
                      />
                      <MastEmptyCell />
                    </MastRow>
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <MastEmptyCell />
                      <TextField
                        disabled={!canUpdateConfig}
                        label={'Min. RA correction'}
                        variant={'outlined'}
                        onChange={handleGuidingMinRaCorrectionChange}
                        value={unitConfigCopy.guiding.min_ra_correction_arcsec}
                        size={'small'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment id={'arcsec'} position={'end'}>
                              arcsec
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        disabled={!canUpdateConfig}
                        label={'Min. DEC correction'}
                        variant={'outlined'}
                        onChange={handleGuidingMinDecCorrectionChange}
                        value={unitConfigCopy.guiding.min_dec_correction_arcsec}
                        size={'small'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment id={'arcsec'} position={'end'}>
                              arcsec
                            </InputAdornment>
                          )
                        }}
                      />
                      <MastEmptyCell />
                    </MastRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Paper sx={{ width: '45%' }}>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {/* Autofocus configuration */}
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <Typography variant="h5" component="div">
                        Autofocus
                      </Typography>
                      <MastEmptyCell />
                      <MastEmptyCell />
                      <MastEmptyCell />
                    </MastRow>
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <MastEmptyCell />
                      <TextField
                        // sx={{ width: '100px' }}
                        disabled={!canUpdateConfig}
                        label={'Binning'}
                        variant={'outlined'}
                        onChange={handleAutofocusBinningChange}
                        value={unitConfigCopy.autofocus.binning}
                        size={'small'}
                      />
                      <TextField
                        // sx={{ width: '130px' }}
                        disabled={!canUpdateConfig}
                        label={'Exposure'}
                        variant={'outlined'}
                        onChange={handleAutofocusExposureChange}
                        value={unitConfigCopy.autofocus.exposure}
                        size={'small'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment id={'sec'} position={'end'}>
                              sec
                            </InputAdornment>
                          )
                        }}
                      />
                      <MastEmptyCell />
                    </MastRow>
                    <MastRow cellStyles={[{}, {}, {}, {}]}>
                      <MastEmptyCell />
                      <TextField
                        id={'numberOfImages'}
                        disabled={!canUpdateConfig}
                        label={'Images'}
                        variant={'outlined'}
                        onChange={handleAutofocusImagesChange}
                        value={unitConfigCopy.autofocus.images}
                        size={'small'}
                      />
                      <TextField
                        id={'ticksPerStep'}
                        disabled={!canUpdateConfig}
                        label={'Step'}
                        variant={'outlined'}
                        onChange={handleAutofocusSpacingChange}
                        value={unitConfigCopy.autofocus.spacing}
                        size={'small'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment id={'sec'} position={'end'}>
                              ticks
                            </InputAdornment>
                          )
                        }}
                      />
                      <MastEmptyCell />
                    </MastRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {/*<Card>*/}
            {/*  <CardContent>*/}
            <Box display={'flex'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Chip
                variant="outlined"
                disabled={!canUpdateConfig}
                size="small"
                onClick={() => saveConfig}
                sx={{ width: '100px' }}
                label="Save"
              />
            </Box>
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </Stack>
        </Card>
      </>
    );
  }

  function renderControls() {
    const canControl = true;
    const disabled = !canControl;

    return (
      <>
        <Card sx={{ marginLeft: '1%' }}>
          <Typography variant="h5">Controls</Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <MastRow cellStyles={[{}, {}, {}, {}]}>
                  <Typography>Guiding</Typography>
                  <Button
                    variant="outlined"
                    disabled={disabled}
                    size="small"
                    onClick={() => unitApi(selectedUnit, 'start_guiding')}
                    sx={{ justifyContent: 'center', width: '150px' }}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={disabled}
                    size="small"
                    onClick={() => unitApi(selectedUnit, 'stop_guiding')}
                    sx={{ justifyContent: 'center', width: '150px' }}
                  >
                    Stop
                  </Button>
                  <Typography />
                </MastRow>
                <MastRow>
                  <Typography>Autofocus</Typography>
                  <Button
                    variant="outlined"
                    disabled={disabled}
                    size="small"
                    onClick={() => unitApi(selectedUnit, 'start_autofocus')}
                    sx={{ justifyContent: 'center', width: '150px' }}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={disabled}
                    size="small"
                    onClick={() => unitApi(selectedUnit, 'stop_autofocus')}
                    sx={{ justifyContent: 'center', width: '150px' }}
                  >
                    Stop
                  </Button>
                  <MastEmptyCell />
                </MastRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
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
        <Stack direction="row">
          <Stack direction={'column'} sx={{ width: '50%' }}>
            <Card sx={{ marginLeft: '1%' }}>
              <Typography variant="h5">Status</Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table" sx={{ borderCollapse: 'collapse' }}>
                  <TableBody>
                    <MastRow cellStyles={[{}, { width: '60%' }, {}, {}]}>
                      <Typography>Operational</Typography>
                      <Typography color={operationalColor}>{operational}</Typography>
                      <Typography />
                      <Typography />
                    </MastRow>
                    <MastRow>
                      <Typography>Why</Typography>
                      <div>
                        {whyNotOperational.map((line, index) => (
                          <Typography key={index} color={operationalColor}>
                            {line}
                          </Typography>
                        ))}
                      </div>
                      <Typography />
                      <Typography />
                    </MastRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            <br />
            {renderControls()}
          </Stack>
          <Card sx={{ width: '50%' }}></Card>
        </Stack>
        {renderConfig()}
      </div>
    );
  }
}

export default UnitComponent;
