import React, { ReactNode, createContext, useState, useEffect, useContext, useMemo } from 'react';
import { fetchSites } from '../config';
import { isEmptyObject } from '../components/Utils';
import { unitApi, controlApi } from 'components/Api';

export interface Site {
  name: string;
  deployed: string[];
  planned: string[];
  location: string;
}

export type Sites = Site[];

interface SitesContextType {
  sites: Site[];
  selectedUnitName: string | null;
  setSelectedUnitName: (unit: string) => void;

  selectedSite: Site;
  setSelectedSite: (site: Site) => void;

  selectedSiteName: string | null;
  setSelectedSiteName: (site: string) => void;

  status: {};
  setStatus: (stat: any) => void;

  deployedUnits: string[];
  setDeployedUnits: (units: string[]) => void;

  allUnits: string[];
  setAllUnits: (units: string[]) => void;
}

export const SitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let [sites, setSites] = useState<Site[]>(null);
  let [selectedUnitName, setSelectedUnitName] = useState<string | null>(null);
  let [selectedSiteName, setSelectedSiteName] = useState<string | null>(null);
  let [selectedSite, setSelectedSite] = useState<Site | null>(null);
  let [status, setStatus] = useState({});
  let [deployedUnits, setDeployedUnits] = useState<string[]>([]);
  let [allUnits, setAllUnits] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      sites,
      setSites,
      selectedUnitName,
      setSelectedUnitName,
      selectedSiteName,
      setSelectedSiteName,
      selectedSite,
      setSelectedSite,
      status,
      setStatus,
      deployedUnits,
      setDeployedUnits,
      allUnits,
      setAllUnits
    }),
    [sites, selectedUnitName, selectedSiteName, status, deployedUnits, allUnits]
  );

  useEffect(() => {
    console.log('SitesContext: effect: calling ingestConfiguredSites()');
    ingestConfiguredSites();
    console.log('SitesContext: effect: calling fetchAllDeployedStatuses()');
    fetchAllDeployedStatuses();

    // const sitesInterval = setInterval(ingestConfiguredSites, 60000);
    const unitsInterval = setInterval(fetchAllDeployedStatuses, 10000);
    return () => {
      // clearInterval(sitesInterval);
      clearInterval(unitsInterval);
    };
  }, []);

  function ingestConfiguredSites() {
    console.log('ingestConfiguredSites: calling fetchSites()');
    fetchSites()
      .then((fetchedSites) => {
        fetchedSites.forEach((site) => {
          console.log(`site: ${site.name}`);
        });
        if (fetchedSites === undefined) return;

        const defaultSite = fetchedSites[0];
        console.log(`defaultSite: [${defaultSite}]`);
        const localAllUnits = [...defaultSite.deployed, ...defaultSite.planned];
        console.log(`localAllUnits: [${localAllUnits}]`);
        let localDeployedUnits = [];

        for (const site of fetchedSites) {
          localDeployedUnits = [...localDeployedUnits, ...site.deployed];
        }
        setSites(fetchedSites);
        setSelectedSite(defaultSite);
        setDeployedUnits(localDeployedUnits);
        setSelectedSiteName(defaultSite.name);
        setSelectedUnitName(localAllUnits[0]);
        setAllUnits(localAllUnits);

        sites = fetchedSites;
        selectedSite = defaultSite;
        selectedSiteName = defaultSite.name;
        selectedUnitName = localAllUnits[0];
        deployedUnits = localDeployedUnits;
      })
      .catch(() => {
        console.log('failed to fetch sites');
      });
  }

  function fetchAllDeployedStatuses() {
    for (const uName of deployedUnits) {
      // first get a short status from the controller
      controlApi(selectedSite.name, `unit/${uName}/minimal_status`)
        .then((shortStatus) => {
          if (shortStatus.detected) {
            // the unit is accessible, get the full status
            unitApi(uName, 'status').then((fullStatus) => {
              setStatus((prevStatus) => ({ ...prevStatus, [uName]: fullStatus }));
            });
          } else {
            shortStatus.type = 'short';
            setStatus((prevStatus) => ({ ...prevStatus, [uName]: shortStatus }));
          }
        })
        .catch(() => {
          setStatus((prevStatus) => ({ ...prevStatus, [uName]: { type: 'short', detected: false, powered: false } }));
        });
    }
  }

  return (
    <SitesContext.Provider
      value={{
        sites: sites,
        setSelectedUnitName: setSelectedUnitName,
        selectedUnitName: selectedUnitName,
        selectedSiteName: selectedSiteName,
        setSelectedSiteName: setSelectedSiteName,
        selectedSite: selectedSite,
        setSelectedSite: setSelectedSite,
        status: status,
        setStatus: setStatus,
        deployedUnits: deployedUnits,
        allUnits: allUnits,
        setAllUnits: setAllUnits,
        setDeployedUnits: setDeployedUnits
      }}
    >
      {children}
    </SitesContext.Provider>
  );
};

export const SitesContext = createContext<SitesContextType | undefined>(undefined);

export function isDeployed(unitName: string): boolean {
  const sitesContext = useSitesContext();

  if (isEmptyObject(unitName)) return false;

  return sitesContext.deployedUnits.includes(unitName);
}

export const useSitesContext = () => {
  const context = useContext(SitesContext);
  if (!context) {
    throw new Error('useSitesContext must be used within a SitesProvider');
  }
  return context;
};
