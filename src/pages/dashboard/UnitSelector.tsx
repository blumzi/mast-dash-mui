import React, { useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { unitApi } from '../../components/Api';
import * as PropTypes from 'prop-types';
import { useSitesContext, isDeployed } from '../../contexts/SitesContext';
import FormGroup from '@mui/material/FormGroup';
import { Notification } from '../../components/Notification';
import { isEmptyObject } from '../../components/Utils';

const IntEnum = {
  0: 'Idle',
  1: 'Activity 1',
  2: 'Activity 2'
};

export function UnitSelector() {
  const sitesContext = useSitesContext();
  if (!sitesContext) {
    throw new Error('UnitSelector must be used within a SitesProvider');
  }
  if (isEmptyObject(sitesContext)) return;

  const {
    selectedUnitName: unit,
    sites,
    status,
    selectedSite,
    setSelectedSiteName,
    setSelectedSite,
    setSelectedUnitName,
    setStatus
  } = sitesContext;

  function handleSiteChange(event, newSite) {
    setSelectedSiteName(newSite);

    sites.forEach((site) => {
      if (site.name === newSite) {
        const unitNames = [...site.deployed, ...site.planned];
        setSelectedUnitName(unitNames[0]);
        setSelectedSite(site);
      }
    });
  }

  function handleUnitChange(event, newValue: string) {
    setSelectedUnitName(newValue);
  }

  function handleUnitClick(unit: string) {
    setSelectedUnitName(unit);
    unitApi(unit, 'status').then((status) => {
      setStatus((prevStatuses) => ({ ...prevStatuses, [unit]: status }));
    });
  }

  function handleSiteClick(siteName: string) {
    setSelectedSiteName(siteName);
    sites.forEach((site) => {
      if (site.name === siteName) {
        const unitNames = [...site.deployed, ...site.planned];
        setSelectedUnitName(unitNames[0]);
        setSelectedSite(site);
      }
    });
    renderUnitsList();
  }

  function renderUnitsList() {
    if (!sitesContext || isEmptyObject(sitesContext.sites)) {
      return null;
    }

    if (!sites) {
      return;
    }

    const units: any[] = [...selectedSite.deployed, ...selectedSite.planned];

    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5">Sites</Typography>
        <Tabs sx={{ '& button': { borderRadius: 2 } }} onChange={handleSiteChange} value={selectedSite.location}>
          {sites.map((site, index) => (
            <Tab
              key={site.name}
              label={site.location}
              onClick={() => handleSiteClick(site.name)}
              color={site.name === selectedSite.name ? 'primary' : 'default'}
              value={site.location}
            />
          ))}
        </Tabs>
        <br />
        <Typography variant="h5">Units at {selectedSite.location}</Typography>
        <Tabs onChange={handleUnitChange} value={unit} variant="scrollable" scrollButtons="auto">
          {units.map((unitName, index) => (
            <Tab
              key={index}
              label={unitName}
              onClick={() => handleUnitClick(unitName)}
              color={unitName === unit ? 'primary' : 'default'}
              value={unitName}
              sx={{ textTransform: 'none', maxWidth: 50 }}
            />
          ))}
        </Tabs>
      </Box>
    );
  }

  // if (isEmptyObject(sitesContext) || isEmptyObject(sitesContext.sites)) {
  //   return;
  // }

  const deployed = isDeployed(unit);
  let detected: boolean;
  try {
    detected = status[unit].detected;
  } catch (e) {
    detected = false;
  }

  return (
    <Box>
      {renderUnitsList()}
      <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} useFlexGap>
        <br />
        {!deployed ? (
          <div>
            <Notification message={`${unit} is not deployed yet!`} severity={'info'} />
            <Typography align={'center'}>
              Unit <b>{unit}</b> is not deployed yet!
            </Typography>
          </div>
        ) : !detected ? (
          <div>
            <Notification message={`${unit} is deployed but does NOT respond to status requests!`} severity={'error'} />
            <Typography align={'center'}>
              Unit <b>{unit}</b> is deployed but does NOT respond to status requests!
            </Typography>
          </div>
        ) : (
          <>
            <FormGroup row>
              <Typography sx={{ width: 100 }}></Typography>
              <Typography variant="h5" sx={{ width: 80 }}>
                Powered
              </Typography>
              <Typography variant="h5" sx={{ width: 100 }}>
                Detected
              </Typography>
              <Typography variant="h5" sx={{ width: 55 }}>
                Oper
              </Typography>
              <Typography variant="h5">Activities</Typography>
            </FormGroup>
          </>
        )}
      </Stack>
    </Box>
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
