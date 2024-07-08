import React, { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { Config } from '../config';
import { set } from 'lodash';

export interface SiteData {
  name: string;
  deployed: string[];
  planned: string[];
  location: string;
}

interface SitesContextType {
  sites: SiteData[];
  selectedUnitName: string | null;
  setSelectedUnitName: (unit: string) => void;

  selectedSite: SiteData;
  setSelectedSite: (site: SiteData) => void;

  selectedSiteName: string | null;
  setSelectedSiteName: (site: string) => void;
}

interface SitesProviderProps {
  children: ReactNode;
}

const SitesContext = createContext<SitesContextType | undefined>(undefined);

export const SitesProvider: React.FC<SitesProviderProps> = ({ children }) => {
  const [sites, setSites] = useState<SiteData[]>(null);
  const [selectedUnitName, setSelectedUnitName] = useState<string | null>(null);
  const [selectedSiteName, setSelectedSiteName] = useState<string | null>(null);
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);

  const fetchSites = async () => {
    const cfg = new Config();
    const sites = await cfg.sites();
    setSites(sites);
    setSelectedSite(sites[0]);
    setSelectedSiteName(sites[0].name);
    const units: string[] = [...sites[0].deployed, ...sites[0].planned];
    setSelectedUnitName(units[0]);
  };
  if (!sites) void fetchSites();

  return (
    <SitesContext.Provider
      value={{
        sites,
        setSelectedUnitName: setSelectedUnitName,
        selectedUnitName: selectedUnitName,
        selectedSiteName: selectedSiteName,
        setSelectedSiteName: setSelectedSiteName,
        selectedSite: selectedSite,
        setSelectedSite: setSelectedSite
      }}
    >
      {children}
    </SitesContext.Provider>
  );
};

export const useSitesContext = () => {
  const context = useContext(SitesContext);
  if (!context) {
    throw new Error('useSitesContext must be used within a SitesProvider');
  }
  return context;
};

export default { SitesContext };
