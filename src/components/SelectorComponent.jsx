import React from 'react';
import UnitSelector from '../pages/dashboard/UnitSelector';
import UnitComponent from './UnitComponent';
import MountComponent from './MountComponent';
import CoversComponent from './CoversComponent';
import FocuserComponent from './FocuserComponent';
import StageComponent from './StageComponent';
import CameraComponent from './CameraComponent';
// import { Config } from '../config';
// import SitesContext from 'contexts/SitesContext'

class SelectorComponent extends React.Component {
  // componentDidMount() {
  //   const cfg = new Config();
  //   cfg
  //     .sites()
  //     .then((sites) => {
  //       const defaultSite = sites[0];
  //       const units = [...defaultSite.deployed, ...defaultSite.planned];
  //       this.setState({ allSites: sites });
  //       this.setState({ selectedSite: defaultSite });
  //       this.setState({ allUnitNames: units });
  //       this.setState({ selectedUnitName: units[0] });
  //     })
  //     .catch((error) => {
  //       console.log('fetchSites: Error: ', error);
  //     });
  //   this.initialized = true;
  // }
  render() {
    return (
      <div>
        <UnitSelector
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
        <UnitComponent
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
        <MountComponent
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
        <CoversComponent
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
        <FocuserComponent
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
        <StageComponent
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
        <CameraComponent
        // allSites={this.state.allSites}
        // selectedSite={this.state.selectedSite}
        // allUnitNames={this.state.allUnitNames}
        // selectedUnitName={this.state.selectedUnitName}
        />
      </div>
    );
  }
}

export default SelectorComponent;
