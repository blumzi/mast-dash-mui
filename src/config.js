// import axios from 'axios';

export class Config {
  constructor() {
    this.base_url = 'http://mast-wis-control:8002/mast/api/v1/control/config';
  }

  async sites() {
    let data = null;
    try {
      const url = this.base_url + '/sites_conf';
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      data = response.json();
      console.log('Config.sites(): url: ', url, ', response: ', response);
    } catch (error) {
      console.error('Config.sites(): url: ', url, ', Error fetching data:', error);
    }
    return data;
  }
}

export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export default Config;
