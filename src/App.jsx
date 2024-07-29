import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { Component } from 'react';
import { SitesProvider } from 'contexts/SitesContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //
// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true
//   });
// }
//
// SitesProvider.whyDidYouRender = true;

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
