import MastComponent from './MastComponent';
import { Button, FormLabel } from '@mui/material';
import React from 'react';
import { unitApi } from './Api';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SitesContext from 'contexts/SitesContext';
import { isEmptyObject } from './Utils';

class CoversComponent extends MastComponent {
  static contextType = SitesContext;
  constructor(props) {
    super(props);
    this.state = {
      ra: '',
      dec: '',
      seconds: '',
      // selectedUnitName: props.selectedUnitName,
      // selectedSiteName: props.selectedSiteName,
      // allSites: props.allSites,
      status: null
    };
    this.fetchCoversStatus();
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchCoversStatus();
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  fetchCoversStatus() {
    if (!this.context) {
      return;
    }
    const selectedUnitName = this.context.selectedUnitName;

    unitApi(selectedUnitName, 'covers/status').then((coversStatus) => {
      this.setState(() => ({
        status: coversStatus
      }));
    });
  }

  handleAbort = () => {
    void unitApi(this.state.selectedUnitName, 'covers/abort');
  };
  configs() {
    return <h6>Nothing yet</h6>;
  }

  controls() {
    if (isEmptyObject(this.context)) {
      return;
    }
    const { selectedUnitName } = this.context.selectedUnitName;
    const isDeployed = this.context.isDeployed(selectedUnitName);

    return (
      <>
        <FormGroup disabled={!isDeployed}>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'covers/startup')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Startup
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'covers/shutdown')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Shutdown
            </Button>
          </FormGroup>
          <FormGroup row>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'covers/open')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Open
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => unitApi(unit, 'covers/close')}
              sx={{ justifyContent: 'flex-start', width: '100px' }}
            >
              Close
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
    if (isEmptyObject(this.state.status)) {
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
          covers
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

export default CoversComponent;
