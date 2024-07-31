// SitesContext.tsx
import React, { createContext, useState, useEffect, useMemo, ReactNode, useContext } from 'react';
import { fetchSites } from '../config';

interface Site {
  name: string;
  deployed: string[];
  planned: string[];
  location: string;
}

interface SitesContextType {
  sites: Site[];
  selectedSite: Site;
  setSelectedSite: (site: Site) => void;
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}

const SitesContext = createContext<SitesContextType | undefined>(undefined);

export const SitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site>();
  const [selectedUnit, setSelectedUnit] = useState<string>();

  const ingestSites = () => {
    // Replace with your actual data fetching logic
    fetchSites()
      .then((sites) => {
        setSites(sites);
        setSelectedSite(sites[0]);
        setSelectedUnit(sites[0]?.deployed[0] || sites[0]?.planned[0]);
      })
      .catch((error) => {
        console.log(`could not fetch sites error ${error}`);
      });
  };

  useEffect(() => {
    ingestSites();
    const interval = setInterval(ingestSites, 600000); // Fetch every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const value = useMemo(
    () => ({
      sites,
      selectedSite,
      setSelectedSite,
      selectedUnit,
      setSelectedUnit
    }),
    [sites, selectedSite, selectedUnit]
  );

  return <SitesContext.Provider value={value}>{children}</SitesContext.Provider>;
};

export const useSitesContext = () => {
  const context = useContext(SitesContext);
  if (!context) {
    throw new Error('useSitesContext must be used within a SitesProvider');
  }
  return context;
};

export function isDeployed(unit: string | null) {
  const { sites } = useSitesContext();

  if (unit === null) {
    return false;
  }

  for (let i = 0; i < sites.length; i++) {
    if (sites[i].deployed.includes(unit)) {
      return true;
    }
  }
  return false;
}

export default SitesContext;
