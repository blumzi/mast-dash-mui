import MastComponent from './MastComponent';
import { Button, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { parseCoordinates } from './Utils';
import { unitApi } from './Api';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

class FocuserComponent extends MastComponent {
  constructor(props) {
    super(props);
    this.state = {
      ra: '',
      dec: '',
      seconds: '',
      selectedUnitName: props.selectedUnitName,
      selectedSite: props.selectedSite,
      allSites: props.allSites,
      status: null
    };
    this.fetchFocuserStatus();
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchFocuserStatus();
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  fetchFocuserStatus() {
    if (!this.state) {
      return;
    }
    const unit = this.state.selectedUnitName;

    unitApi(unit, 'focuser/status').then((coversStatus) => {
      this.setState(() => ({
        status: coversStatus
      }));
    });
  }
  isDeployed(unit_name) {
    return this.state.selectedSite.deployed.includes(unit_name);
  }
  handleRaChange = (event) => {
    this.setState({ ra: event.target.value });
  };
  handleDecChange = (event) => {
    this.setState({ dec: event.target.value });
  };

  handleMoveToCoordinates = () => {
    const raNumeric = parseCoordinates(this.state.ra);
    const decNumeric = parseCoordinates(this.state.dec);
    void unitApi(this.state.selectedUnitName, 'move_to_coordinates', { ra: raNumeric, dec: decNumeric });
  };

  handleAbort = () => {
    void unitApi(this.state.selectedUnitName, 'mount/abort');
  };
  configs() {
    return <>Nothing yet</>;
  }

  controls() {
    const unit = this.state.selectedUnitName;
    const ra = this.state.ra;
    const dec = this.state.dec;

    return (
      <>
        <FormGroup disabled={this.isDeployed(unit)}>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'mount/startup')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Startup
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'mount/shutdown')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Shutdown
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'mount/start_tracking')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Start tracking
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'mount/stop_tracking')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Stop tracking
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'mount/park')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Park
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'mount/find_home')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Find home
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={this.handleMoveToCoordinates}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Go to
            </Button>
            <TextField label={'RA'} variant={'standard'} onChange={this.handleRaChange} value={ra} />
            &nbsp; &nbsp; &nbsp;
            <TextField label={'Dec'} variant={'standard'} onChange={this.handleDecChange} value={dec} />
          </FormGroup>
          <FormGroup row>
            <Button variant="text" size="small" onClick={this.handleAbort} sx={{ justifyContent: 'flex-start', width: '100px' }}>
              Abort
            </Button>
          </FormGroup>
        </FormGroup>
      </>
    );
  }
  summary() {
    if (!this.state.status) {
      return;
    }
    const status = this.state.status;
    let activities = status.activities_verbal.replace('<CoversActivities.', '').replace(/:.*/, '');
    if (activities === '0') {
      activities = 'Idle';
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormLabel component="string" sx={{ mr: 2, justifyContent: 'flex-start', width: '50px' }}>
          focuser
        </FormLabel>
        <FormControlLabel control={<Checkbox size="small" checked={status.powered} />} label="Powered" labelPlacement={'end'} />
        <FormControlLabel control={<Checkbox size="small" checked={status.detected} />} label="Detected" labelPlacement={'end'} />
        <Typography>
          Activities: <b>{activities}</b>
        </Typography>
      </div>
    );
  }
}

export default FocuserComponent;
