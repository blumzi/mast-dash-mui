import SitesContext from 'contexts/SitesContext';

export interface Site {
  name: string;
  deployed: string[];
  planned: string[];
  location: string;
}

export type Sites = Site[];

export function fetchConfiguredSites() {
  let data;
  syncFetchSites().then((sites) => {
    data = sites;
    return sites;
  });
  return data;
}

export async function syncFetchSites(): Promise<Sites | null> {
  try {
    const data: Sites = await fetchSites();
    return data;
  } catch (error) {
    console.log('syncFetchSites: error: ', error);
    return null;
  }
}

export async function fetchSites() {
  let data;
  const url: string = 'http://mast-wis-control:8002/mast/api/v1/control/config/sites_conf';

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
      //mode: 'no-cors'
    });
    data = await response.json();
    console.log('fetchSites(): url: ', url, ', response: ', response);
  } catch (error) {
    console.error('fetchSites(): url: ', url, ', Error fetching data:', error);
  }
  return data as Sites;
}

export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export default fetchConfiguredSites;
