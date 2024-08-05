import React, { useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as PropTypes from 'prop-types';
import { useSitesContext, isDeployed } from '../../contexts/SitesContext';
import FormGroup from '@mui/material/FormGroup';
import { Notification } from '../../components/Notification';
import { isEmptyObject } from '../../components/Utils';
import { useUnitStatusContext } from '../../contexts/UnitStatusContext';
import { PowerSwitchComponent } from '../../components/PowerSwitchComponent';

const IntEnum = {
  0: 'Idle',
  1: 'Activity 1',
  2: 'Activity 2'
};

export function UnitSelector() {
  const { sites, selectedSite, setSelectedSite, selectedUnit, setSelectedUnit } = useSitesContext();
  const { statuses } = useUnitStatusContext();
  const deployed = isDeployed(selectedUnit);

  function handleSiteChange(event: React.ChangeEvent<HTMLInputElement>, newSiteLocation: string) {
    for (let i = 0; i < sites.length; i++) {
      if (sites[i].location === newSiteLocation) {
        const units = [...sites[i].deployed, ...sites[i].planned];
        setSelectedUnit(units[0]);
        setSelectedSite(sites[i]);
        return;
      }
    }
  }

  function handleUnitChange(event, newValue: string) {
    setSelectedUnit(newValue);
  }

  function handleUnitClick(unit: string) {
    setSelectedUnit(unit);
    // unitApi(unit, 'status').then((status) => {
    //   setStatus((prevStatuses) => ({ ...prevStatuses, [unit]: status }));
    // });
  }

  function handleSiteClick(event, siteName: string) {
    for (let i = 0; i < sites.length; i++) {
      if (sites[i].name === siteName) {
        const unitNames = [...sites[i].deployed, ...sites[i].planned];
        setSelectedUnit(unitNames[0]);
        setSelectedSite(sites[i]);
        return;
      }
    }

    renderUnitsList();
  }

  function renderUnitsList() {
    if (isEmptyObject(sites) || isEmptyObject(selectedSite)) {
      return null;
    }

    const units: string[] = [...selectedSite.deployed, ...selectedSite.planned];

    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5">Sites</Typography>
        <Tabs sx={{ '& button': { borderRadius: 2 } }} onChange={handleSiteChange} value={selectedSite.location}>
          {sites.map((site) => (
            <Tab
              key={site.name}
              label={site.location}
              onClick={handleSiteClick}
              color={site.name === selectedSite.name ? 'primary' : 'default'}
              value={site.location}
            />
          ))}
        </Tabs>
        <br />
        <Typography variant="h5">Units at {selectedSite.location}</Typography>
        <Tabs onChange={handleUnitChange} value={selectedUnit} variant="scrollable" scrollButtons="auto">
          {units.map((unitName, index) => (
            <Tab
              key={index}
              label={unitName}
              onClick={() => handleUnitClick(unitName)}
              color={unitName === selectedUnit ? 'primary' : 'default'}
              value={unitName}
              sx={{ textTransform: 'none', maxWidth: 50 }}
            />
          ))}
        </Tabs>
      </Box>
    );
  }

  if (isEmptyObject(selectedUnit) || isEmptyObject(statuses[selectedUnit])) return;

  let detected: boolean;
  let powered: boolean;

  if (deployed) {
    try {
      detected = statuses[selectedUnit ?? 0].detected;
    } catch (e) {
      detected = false;
    }
  } else {
    detected = false;
  }

  if (deployed) {
    try {
      powered = statuses[selectedUnit ?? 0].powered;
    } catch (e) {
      powered = false;
    }
  } else {
    powered = false;
  }

  let message = '';

  if (!deployed) {
    message = `Unit ${selectedUnit} is not deployed yet!`;
  } else {
    if (!powered) {
      message = `Unit ${selectedUnit} is deployed but not powered`;
    } else {
      if (!detected) {
        message = `Unit ${selectedUnit} is deployed and powered but not detected`;
      }
    }
  }

  return (
    <>
      <Box>
        {renderUnitsList()}
        <PowerSwitchComponent />
        <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} useFlexGap>
          <br />
          {message !== '' ? (
            <div>
              <Notification message={message} severity={'info'} />
              <Typography align={'center'}>{message}</Typography>
            </div>
          ) : (
            <>
              <FormGroup row>
                <Typography variant="h5" sx={{ width: 100 }}>
                  Comp.
                </Typography>
                <Typography variant="h5" sx={{ width: 80 }}>
                  Powered
                </Typography>
                <Typography variant="h5" sx={{ width: 100 }}>
                  Detected
                </Typography>
                <Typography variant="h5" sx={{ width: 55 }}>
                  Oper.
                </Typography>
                <Typography variant="h5">Activities</Typography>
              </FormGroup>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}

UnitSelector.propTypes = {
  selectedUnitName: PropTypes.string,
  selectedSite: PropTypes.any,
  setSelectedSite: PropTypes.any,
  allUnitNames: PropTypes.array,
  allSites: PropTypes.array
};

export default UnitSelector;
