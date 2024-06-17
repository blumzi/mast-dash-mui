// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '/dashboard/default',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
  sites: {
    wis: {
      name: 'wis',
      location: 'Weizmann',
      controllerHost: 'mast-wis-controller',
      specHost: 'mast-wis-spec',
      deployed: ['mastw'],
      planned: []
    },
    ns: {
      name: 'ns',
      location: 'Neot Smadar',
      controllerHost: 'mast-ns-controller',
      specHost: 'mast-ns-spec',
      deployed: [],
      planned: [
        'mast01',
        'mast02',
        'mast03',
        'mast04',
        'mast05',
        'mast06',
        'mast07',
        'mast08',
        'mast09',
        'mast10',
        'mast11',
        'mast12',
        'mast13',
        'mast14',
        'mast15',
        'mast16',
        'mast17',
        'mast18',
        'mast19',
        'mast20'
      ]
    }
  }
};

export default config;
export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
