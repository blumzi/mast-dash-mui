import axios from 'axios';
import { buildUnitUrl, buildControlUrl, buildSpecUrl } from './Utils';
import { fetchConfiguredSites } from 'config';

export async function unitApi(unitName, method, params) {
  // let deployedUnits = [];
  // const sites = await fetchConfiguredSites();
  // for (let siteId in sites) {
  //   deployedUnits = [...deployedUnits, ...sites[siteId].deployed];
  // }
  // if (!deployedUnits.includes(unitName)) {
  //   return;
  // }

  return await getUrl(buildUnitUrl(unitName, method, params));
}

export async function controlApi(site, method, params) {
  return await getUrl(buildControlUrl(site, method, params));
}

export async function specApi(site, method, params) {
  return await getUrl(buildSpecUrl(site, method, params));
}

async function getUrl(url) {
  try {
    const response = await axios.get(url);
    if (!response.data) {
      return;
    }
    if ('exception' in response.data) {
      console.error(`url=${url}, exception=${response.data.exception}`);
    } else if ('error' in response.data) {
      console.error(`url=${url}, error=${response.data.error}`);
    } else if ('value' in response.data) {
      return response.data.value;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching unit status (url: ${url}, error: ${error})`);
  }
}
