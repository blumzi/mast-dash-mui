import React, { useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { unitApi } from '../../components/Api';
import * as PropTypes from 'prop-types';
import { SiteData, useSitesContext } from '../../contexts/SitesContext';
import { isEmptyObject } from '../../components/Utils';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UnitComponent from '../../components/UnitComponent';

const IntEnum = {
  0: 'Idle',
  1: 'Activity 1',
  2: 'Activity 2'
};

function UnitSelector() {
  const statuses = [];
  const [value, setValue] = useState(0);

  const sitesContext = useSitesContext();

  function handleSiteChange(event: any, newSite: string) {
    sitesContext.setSelectedSiteName(newSite);
    sitesContext.sites.forEach((site) => {
      if (site.name === newSite) {
        const unitNames = [...site.deployed, ...site.planned];
        sitesContext.setSelectedUnitName(unitNames[0]);
        sitesContext.setSelectedSite(site);
      }
    });
  }

  function handleUnitChange(event, newValue: string) {
    sitesContext.setSelectedUnitName(newValue);
  }

  function handleUnitClick(unit: string) {
    sitesContext.setSelectedUnitName(unit);
    unitApi(unit, 'status').then((status) => {
      statuses[unit] = status;
    });
  }

  function handleSiteClick(siteName: string) {
    sitesContext.setSelectedSiteName(siteName);
    sitesContext.sites.forEach((site) => {
      if (site.name === siteName) {
        const unitNames = [...site.deployed, ...site.planned];
        sitesContext.setSelectedUnitName(unitNames[0]);
        sitesContext.setSelectedSite(site);
      }
    });
    renderUnitsList();
  }

  function renderUnitsList() {
    if (!sitesContext || !sitesContext.sites) {
      return null;
    }
    const sites = sitesContext.sites;
    if (!sites) {
      return;
    }
    const selectedSite = sitesContext.selectedSite;
    const units = [...selectedSite.deployed, ...selectedSite.planned];
    const selectedUnit = units[0];

    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5">Sites</Typography>
        <Tabs onChange={handleSiteChange} value={selectedSite.location}>
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
        <Tabs onChange={handleUnitChange} value={selectedUnit} variant="scrollable" scrollButtons="auto">
          {units.map((unitName, index) => (
            <Tab
              key={index}
              label={unitName}
              onClick={() => handleUnitClick(unitName)}
              color={unitName === selectedUnit ? 'primary' : 'default'}
              value={unitName}
              maxwidth={50}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>
    );
  }

  // renderMultilineText = (lines) => (
  //   <Box sx={{ lineHeight: 'small' }}>
  //     {lines.map((line, index) => {
  //       return (
  //         <Typography variant="body1" key={index} component={'div'} marginLeft={2}>
  //           {line}
  //         </Typography>
  //       );
  //     })}
  //     <br />
  //   </Box>
  // );

  if (!sitesContext || !sitesContext.sites) {
    return;
  }
  const unitName = sitesContext.selectedUnitName;
  const unitStatus = statuses[unitName];
  const isDeployed = sitesContext.selectedSite.deployed.includes(unitName);

  return (
    <Box>
      {renderUnitsList()}
      <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} useFlexGap>
        <br />
        {/*<Divider orientation="horizontal" />*/}
        <Typography variant="h5">Status of &apos;{unitName}&apos;</Typography>
        <br />
        {isDeployed && unitStatus ? (
          <>
            <FormGroup row>
              <FormControlLabel name="powered" control={<Checkbox checked={unitStatus.powered} />} label="Powered" />
              <FormControlLabel name="detected" control={<Checkbox checked={unitStatus.detected} />} label="Detected" />
              <FormControlLabel name="operational" control={<Checkbox checked={unitStatus.operational} />} label="Operational" />
            </FormGroup>
            <br />
            <FormGroup>
              {unitStatus.whyNotOperational && (
                <Box>
                  <Typography variant="h5">Why not Operational:</Typography>
                  {this.renderMultilineText(unitStatus.whyNotOperational)}
                </Box>
              )}
              <Typography variant="h5">Activities:</Typography>
              <Typography variant="body1" marginLeft={2}>
                {IntEnum[unitStatus.activities]}
              </Typography>
              <br />
            </FormGroup>
            {/*<UnitComponent />*/}
          </>
        ) : !isDeployed ? (
          <Typography variant="h3">&apos;{unitName}&apos; is not deployed yet</Typography>
        ) : (
          <Typography sx={{ color: 'error.main' }} variant="h3">
            &apos;{unitName}&apos; is deployed but does not respond to status requests!
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

UnitSelector.propTypes = {
  // selectedUnitName: PropTypes.string.isRequired,
  selectedUnitName: PropTypes.string,
  selectedSite: PropTypes.any,
  setSelectedSite: PropTypes.any,
  allUnitNames: PropTypes.array,
  allSites: PropTypes.array
};

export default UnitSelector;
