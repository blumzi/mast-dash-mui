import axios from 'axios';

export class Config {
  constructor() {
    this.base_url = 'http://mast-wis-control:8002/mast/api/v1/control/config';
  }

  async sites() {
    let data = null;
    try {
      const response = await axios.get(this.base_url + '/sites_conf');
      data = response.data;
      console.log('Data fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    return data;
  }
}

export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export default Config;
