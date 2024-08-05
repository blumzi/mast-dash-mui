import React from 'react';
import UnitSelector from '../pages/dashboard/UnitSelector';
import UnitComponent from './UnitComponent';
import MountComponent from './MountComponent';
import CoversComponent from './CoversComponent';
import FocuserComponent from './FocuserComponent';
import StageComponent from './StageComponent';
import CameraComponent from './CameraComponent';
import { PowerSwitchComponent } from './PowerSwitchComponent';

export function SelectorComponent() {
  return (
    <>
      <UnitSelector />
      <UnitComponent />
      {/*<MountComponent />*/}
      {/*<CoversComponent />*/}
      {/*<FocuserComponent />*/}
      {/*<StageComponent />*/}
      {/*<CameraComponent />*/}
    </>
  );
}

export default SelectorComponent;
