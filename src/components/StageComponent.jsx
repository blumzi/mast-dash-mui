import MastComponent from './MastComponent';
import { Button, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { parseCoordinates } from './Utils';
import { unitApi } from './Api';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SitesContext from 'contexts/SitesContext';

class StageComponent extends MastComponent {
  static contextType = SitesContext;
  constructor(props) {
    super(props);
    this.state = {
      // ra: '',
      // dec: '',
      // seconds: '',
      // selectedUnitName: props.selectedUnitName,
      // selectedSite: props.selectedSite,
      // allSites: props.allSites,
      status: null
    };
    this.fetchStageStatus();
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchStageStatus();
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  fetchStageStatus() {
    if (!this.context) {
      return;
    }
    const { selectedUnitName } = this.state.selectedUnitName;

    unitApi(selectedUnitName, 'stage/status').then((stageStatus) => {
      this.setState(() => ({
        status: stageStatus
      }));
    });
  }

  handleAbort = () => {
    void unitApi(this.state.selectedUnitName, 'mount/abort');
  };
  configs() {
    return <>Nothing yet</>;
  }

  controls() {
    const selectedUnitName = this.context.selectedUnitName;
    const isDeployed = this.context.isDeployed(selectedUnitName);

    return (
      <>
        <FormGroup disabled={!isDeployed}>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'stage/startup')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Startup
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'stage/shutdown')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Shutdown
            </Button>
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
    const status = this.state.status;
    let activities = status.activities_verbal.replace('<StageActivities.', '').replace(/:.*/, '');
    if (activities === '0') {
      activities = 'Idle';
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormLabel component="string" sx={{ mr: 2, justifyContent: 'flex-start', width: '50px' }}>
          stage
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

export default StageComponent;
