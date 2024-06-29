import MastComponent from './MastComponent';
import { Button, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { parseCoordinates } from './Utils';
import { controlApi, unitApi } from './Api';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SitesContext from 'contexts/SitesContext';

class UnitComponent extends MastComponent {
  static contextType = SitesContext;
  constructor(props) {
    super(props);
    this.state = {
      ra: '',
      dec: '',
      seconds: '',
      // selectedUnitName: props.selectedUnitName,
      // selectedSite: props.selectedSite,
      // allSites: props.allSites,
      statuses: {}
    };
    this.fetchUnitStatus();
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchUnitStatus();
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  fetchUnitStatus() {
    if (!this.context) {
      return;
    }
    const { selectedUnitName, selectedSite } = this.context.selectedUnitName;
    // console.log(`fetchUnitStatus: site: ${this.state.selectedSite.name}, unit: ${this.state.selectedUnitName}`);
    // first get a mini status from the controller
    controlApi(selectedSite.name, `unit/${selectedUnitName}/minimal_status`).then((mini_status) => {
      if (mini_status.powered && mini_status.detected) {
        // the unit is accessible, get the full status
        unitApi(unit, 'status').then((full_status) => {
          this.setState((prevState) => ({
            statuses: {
              ...prevState.statuses,
              [unit]: full_status
            }
          }));
        });
      } else {
        // keep the mini status
        this.setState((prevState) => ({
          statuses: {
            ...prevState.statuses,
            [unit]: mini_status
          }
        }));
      }
    });
  }
  isDeployed(unit_name) {
    return this.state.selectedSite.deployed.includes(unit_name);
  }
  handleRaChange(event) {
    const newRa = event.target.value;
    this.setState((prevState) => ({
      coordinates: {
        ...prevState.coords,
        ra: newRa
      }
    }));
  }
  handleDecChange(event) {
    const newDec = event.target.value;
    this.setState((prevState) => ({
      coordinates: {
        ...prevState.coords,
        dec: newDec
      }
    }));
  }
  handleSecondsChange(event) {
    const newSeconds = event.target.value;
    this.setState((prevState) => ({
      coordinates: {
        ...prevState.coords,
        seconds: newSeconds
      }
    }));
  }

  handleMoveToCoordinates = () => {
    const raNumeric = parseCoordinates(this.state.ra);
    const decNumeric = parseCoordinates(this.state.dec);
    void unitApi(this.state.selectedUnitName, 'move_to_coordinates', { ra: raNumeric, dec: decNumeric });
  };

  handleExpose = () => {
    const secondsNumeric = parseFloat(this.state.seconds);
    void unitApi(this.state.selectedUnitName, 'expose', { seconds: secondsNumeric });
  };
  configs() {
    return <>Nothing yet</>;
  }

  controls() {
    const { seconds } = this.state;
    const unit = this.context.selectedUnitName;
    const isDeployed = this.context.isDeployed(unit);

    return (
      <>
        <FormGroup disabled={!isDeployed}>
          <FormGroup row>
            <Button variant="text" onClick={() => unitApi('startup')} sx={{ justifyContent: 'flex-start', width: '120px' }}>
              Startup
            </Button>
            <Button variant="text" onClick={() => unitApi('shutdown')} sx={{ justifyContent: 'flex-start', width: '120px' }}>
              Shutdown
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button variant="text" onClick={() => unitApi('start_autofocus')} sx={{ justifyContent: 'flex-start', width: '120px' }}>
              Start autofocus
            </Button>
            <Button variant="text" onClick={() => unitApi('stop_autofocus')} sx={{ justifyContent: 'flex-start', width: '120px' }}>
              Stop autofocus
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button variant="text" onClick={this.handleExpose} sx={{ justifyContent: 'flex-start', width: '120px' }}>
              Expose
            </Button>
            <TextField label={'Seconds'} variant={'standard'} onChange={this.handleSecondsChange} value={seconds} />
          </FormGroup>
        </FormGroup>
      </>
    );
  }
  summary() {
    const unit = this.context.selectedUnitName;
    const isDeployed = this.context.isDeployed(unit);

    if (!isDeployed) {
      return <h6>Unit &apos;{unit}&apos; is not deployed yet!</h6>;
    }
    if (!(unit in this.state.statuses)) {
      return <h6>No status for {this.state.selectedUnitName} yet!</h6>;
    }
    const status = this.state.statuses[unit];
    let activities = status.activities_verbal.replace('<UnitActivities.', '').replace(/:.*/, '');
    if (activities === '0') {
      activities = 'Idle';
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormLabel component="string" sx={{ mr: 2, justifyContent: 'flex-start', width: '50px' }}>
          unit
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

export default UnitComponent;
