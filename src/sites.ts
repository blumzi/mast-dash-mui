import Config from './config';

interface SiteUnits {
  deployed: string[];
  planned: string[];
}

class Sites {
  public sites: { [key: string]: SiteUnits } = {};

  constructor() {
    const cfg = new Config();
    cfg
      .sites()
      .then((sites) => {
        this.sites = sites;
      })
      .catch((error) => {
        console.log('fetchSites: Error: ', error);
      });
  }

  isDeployed(siteName: string, unitName: string): boolean {
    return unitName in this.sites[siteName].deployed;
  }

  defaultUnit(siteName: string | undefined): string {
    let site;
    if (siteName === undefined || siteName === '') {
      site = this.sites[0];
    } else {
      site = this.sites[siteName];
    }
    const units = [...site[siteName].deployed, ...site[siteName].planned];
    return units[0];
  }
}

// Example usage
const sites = new Sites();
export default sites;
