import { Button, FormLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { controlApi, unitApi } from './Api';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useSitesContext } from 'contexts/SitesContext';
import { isEmptyObject } from './Utils';

export function UnitComponent() {
  const sitesContext = useSitesContext();
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState(null);

  // fetchUnitStatus();
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUnitStatus();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  function fetchUnitStatus() {
    if (!sitesContext || !sitesContext.sites) {
      return;
    }

    // first get a mini status from the controller
    controlApi(sitesContext.selectedSite.name, `unit/${sitesContext.selectedUnit}/minimal_status`)
      .then((mini_status) => {
        if (mini_status.powered && mini_status.detected) {
          // the unit is accessible, get the full status
          unitApi(sitesContext.selectedUnit, 'status').then((full_status) => {
            setStatus(full_status);
          });
        } else {
          // keep the mini status
          setStatus(mini_status);
        }
      })
      .catch(() => {
        setStatus(null);
      });
  }

  function isDeployed(unit_name) {
    return sitesContext.selectedSite.deployed.includes(unit_name);
  }

  function handleSecondsChange(event) {
    setSeconds(parseFloat(event.target.value));
  }

  function handleExpose() {
    void unitApi(sitesContext.selectedUnit, 'expose', { seconds: seconds });
  }

  function configs() {
    return <>Nothing yet</>;
  }

  function controls() {
    if (isEmptyObject(sitesContext)) {
      return;
    }

    const unit = sitesContext.selectedUnit;

    return (
      <>
        <FormGroup>
          <FormGroup row>
            <Button
              disabled={!isDeployed(unit)}
              variant="text"
              onClick={() => unitApi(unit, 'startup')}
              sx={{ justifyContent: 'flex-start', width: '120px' }}
            >
              Startup
            </Button>
            <Button
              disabled={!isDeployed(unit)}
              variant="text"
              onClick={() => unitApi(unit, 'shutdown')}
              sx={{ justifyContent: 'flex-start', width: '120px' }}
            >
              Shutdown
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              disabled={!isDeployed(unit)}
              variant="text"
              onClick={() => unitApi(unit, 'start_autofocus')}
              sx={{ justifyContent: 'flex-start', width: '120px' }}
            >
              Start autofocus
            </Button>
            <Button
              disabled={!isDeployed(unit)}
              variant="text"
              onClick={() => unitApi(unit, 'stop_autofocus')}
              sx={{ justifyContent: 'flex-start', width: '120px' }}
            >
              Stop autofocus
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              disabled={!isDeployed(unit)}
              variant="text"
              onClick={handleExpose}
              sx={{ justifyContent: 'flex-start', width: '120px' }}
            >
              Expose
            </Button>
            <TextField disabled={!isDeployed(unit)} label={'Seconds'} variant={'standard'} onChange={handleSecondsChange} value={seconds} />
          </FormGroup>
        </FormGroup>
      </>
    );
  }

  function summary() {
    if (isEmptyObject(sitesContext)) {
      return;
    }
    const unit = sitesContext.selectedUnit;
    // const isDeployed = isDeployed(unit);

    if (!isDeployed(unit)) {
      return <h6>Unit &apos;{unit}&apos; is not deployed yet!</h6>;
    }
    if (isEmptyObject(status)) {
      return <h6>No status for {sitesContext.selectedUnit} yet!</h6>;
    }

    let activities = status.activities_verbal.replace('<UnitActivities.', '').replace(/:.*/, '');
    if (activities === '0') {
      activities = 'Idle';
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormLabel sx={{ mr: 2, justifyContent: 'flex-start', width: '50px' }}>unit</FormLabel>
        <FormControlLabel control={<Checkbox size="small" checked={status.powered} />} label="Powered" labelPlacement={'end'} />
        <FormControlLabel control={<Checkbox size="small" checked={status.detected} />} label="Detected" labelPlacement={'end'} />
        <Typography>
          Activities: <b>{activities}</b>
        </Typography>
      </div>
    );
  }
}

export default UnitComponent;
