import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import UnitComponent from '../../components/UnitComponent';
import { unitApi } from '../../components/Api';
import * as PropTypes from 'prop-types';

const IntEnum = {
  0: 'Idle',
  1: 'Activity 1',
  2: 'Activity 2'
};

export class UnitSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSite: props.selectedSite,
      selectedUnitName: props.selectedUnitName,
      allSites: props.allSites,
      allUnitNames: props.allUnitNames,
      statuses: []
    };
  }
  isDeployed(unit_name) {
    return this.state.selectedSite.deployed.includes(unit_name);
  }
  // componentDidMount() {
  //   const cfg = new Config();
  //   cfg
  //     .sites()
  //     .then((sites) => {
  //       const site = sites[0];
  //       this.setState({ allSites: sites, selectedSite: site });
  //       const units = [...site.deployed, ...site.planned];
  //       this.setState({ allUnitNames: units });
  //       this.setState({ selectedUnitName: units[0] });
  //     })
  //     .catch((error) => {
  //       console.log('fetchSites: Error: ', error);
  //     });
  // }
  handleSiteChange = (event, newValue) => {
    this.setState({ selectedSite: newValue });
  };

  handleUnitChange = (event, newValue) => {
    this.setState({ selectedUnitName: newValue });
  };

  handleUnitClick = (unit) => {
    this.setState({ selectedUnitName: unit });
    unitApi(unit, 'status').then((status) => {
      this.setState((prevState) => ({
        statuses: {
          ...prevState.statuses,
          [unit]: status
        }
      }));
    });
  };

  handleSiteClick = (site) => {
    this.setState({ selectedSite: site });
    const units = [...site.deployed, ...site.planned];
    this.setState({ allUnitNames: units });
    console.log(
      `selectedSite name: ${this.state.selectedSite.name}, deployed: [${this.state.selectedSite.deployed}], planned: [${this.state.selectedSite.planned}]`
    );
    this.setState({ selectedUnitName: units[0] });
    console.log(`selectedUnitName: '${this.state.selectedUnitName}'`);
    this.renderUnitsList();
  };

  renderUnitsList = () => {
    if (!this.state || !this.state.allSites || !this.state.selectedSite || !this.state.allUnitNames) {
      return null;
    }
    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5">Sites</Typography>
        <Tabs onChange={this.handleSiteChange} value={this.state.selectedSite.location}>
          {this.state.allSites.map((site, index) => (
            <Tab
              key={index}
              label={site.location}
              onClick={() => this.handleSiteClick(site, index)}
              color={site === this.state.selectedSite ? 'primary' : 'default'}
              value={site.location}
            />
          ))}
        </Tabs>
        <br />
        <Typography variant="h5">Units at {this.state.selectedSite.location}</Typography>
        <Tabs onChange={this.handleUnitChange} value={this.state.selectedUnitName} variant="scrollable" scrollButtons="auto">
          {this.state.allUnitNames.map((unitName, index) => (
            <Tab
              key={index}
              label={unitName}
              onClick={() => this.handleUnitClick(unitName)}
              color={unitName === this.state.selectedUnitName ? 'primary' : 'default'}
              value={unitName}
              maxwidth={50}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>
    );
  };

  renderMultilineText = (lines) => (
    <Box sx={{ lineHeight: 'small' }}>
      {lines.map((line, index) => {
        return (
          <Typography variant="body1" key={index} component={'div'} marginLeft={2}>
            {line}
          </Typography>
        );
      })}
      <br />
    </Box>
  );

  render() {
    // if (!this.state || !this.state.selectedUnitName || !this.state.statuses[this.state.selectedUnitName]) {
    //   return null;
    // }
    const unit = this.state.selectedUnitName;
    // const allUnitNames = this.state.allUnitNames;
    // const status = this.state.statuses[unit];

    return (
      <Box>
        {this.renderUnitsList()}
        {/*<Stack direction="column" divider={<Divider orientation="vertical" flexItem />} useFlexGap>*/}
        <br />
        <Divider orientation="horizontal" />
        <Typography variant="h5">Status of &apos;{unit}&apos;</Typography>
        <br />
        {/*  {this.isDeployed(unit) && status ? (*/}
        {/*    <>*/}
        {/*      <FormGroup row>*/}
        {/*        <FormControlLabel name="powered" control={<Checkbox checked={status.powered} />} label="Powered" />*/}
        {/*        <FormControlLabel name="detected" control={<Checkbox checked={status.detected} />} label="Detected" />*/}
        {/*        <FormControlLabel name="operational" control={<Checkbox checked={status.operational} />} label="Operational" />*/}
        {/*      </FormGroup>*/}
        {/*      <br />*/}
        {/*      <FormGroup>*/}
        {/*        {status.whyNotOperational && (*/}
        {/*          <Box>*/}
        {/*            <Typography variant="h5">Why not Operational:</Typography>*/}
        {/*            {this.renderMultilineText(status.whyNotOperational)}*/}
        {/*          </Box>*/}
        {/*        )}*/}
        {/*        <Typography variant="h5">Activities:</Typography>*/}
        {/*        <Typography variant="body1" marginLeft={2}>*/}
        {/*          {IntEnum[status.activities]}*/}
        {/*        </Typography>*/}
        {/*        <br />*/}
        {/*      </FormGroup>*/}
        {/*      <UnitComponent />*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <Typography variant="h3">Not deployed yet</Typography>*/}
        {/*  )}*/}
        {/*</Stack>*/}
      </Box>
    );
  }
}

UnitSelector.propTypes = {
  // selectedUnitName: PropTypes.string.isRequired,
  selectedUnitName: PropTypes.string,
  selectedSite: PropTypes.any,
  setSelectedSite: PropTypes.any,
  allUnitNames: PropTypes.array,
  allSites: PropTypes.array
};

export default UnitSelector;
