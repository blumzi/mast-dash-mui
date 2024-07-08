import React from 'react';
import UnitSelector from '../pages/dashboard/UnitSelector';
import UnitComponent from './UnitComponent';
import MountComponent from './MountComponent';
import CoversComponent from './CoversComponent';
import FocuserComponent from './FocuserComponent';
import StageComponent from './StageComponent';
import CameraComponent from './CameraComponent';

class SelectorComponent extends React.Component {
  render() {
    return (
      <div>
        <UnitSelector />
        <UnitComponent />
        {/*<MountComponent />*/}
        {/*<CoversComponent />*/}
        {/*<FocuserComponent />*/}
        {/*<StageComponent />*/}
        {/*<CameraComponent />*/}
      </div>
    );
  }
}

export default SelectorComponent;
