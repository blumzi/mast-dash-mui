import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { Component } from 'react';
import { SitesProvider } from 'contexts/SitesContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default class App extends Component {
  render() {
    return (
      <ThemeCustomization>
        <ScrollTop>
          <SitesProvider>
            <RouterProvider router={router} />
          </SitesProvider>
        </ScrollTop>
      </ThemeCustomization>
    );
  }
}
