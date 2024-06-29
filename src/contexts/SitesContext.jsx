import { Config } from '../config';
import React from 'react';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export const SitesContext = React.createContext(null);
export class SitesProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSites: [],
      selectedSite: null,
      allUnitNames: null,
      selectedUnitName: null
    };
  }
  componentDidMount() {
    const cfg = new Config();
    cfg
      .sites()
      .then((sites) => {
        const defaultSite = sites[0];
        const units = [...defaultSite.deployed, ...defaultSite.planned];
        this.setState({
          allSites: sites,
          selectedSite: defaultSite,
          allUnitNames: units,
          selectedUnitName: units[0]
        });
      })
      .catch((error) => {
        console.log('fetchSites: Error: ', error);
      });
  }

  isDeployed(unit_name) {
    return this.state.selectedSite.deployed.includes(unit_name);
  }

  selectSite(site) {
    this.setState({ selectedSite: site });
  }
  selectUnitName(unit_name) {
    this.setState({ selectedUnitName: unit_name });
  }

  allUnitNames() {
    return this.state.allUnitNames;
  }

  render() {
    return (
      <SitesContext.Provider
        value={{
          allSites: this.state.allSites,
          selectedSite: this.state.selectedSite,
          allUnitNames: this.state.allUnitNames,
          selectedUnitName: this.state.selectedUnitName
        }}
      >
        {this.props.children}
      </SitesContext.Provider>
    );
  }
}

export default SitesProvider;
