// UnitStatusContext.tsx
import React, { createContext, useState, useMemo, ReactNode, useContext, useEffect } from 'react';
import { useSitesContext } from './SitesContext';
import { unitApi, controlApi } from '../components/Api';

type UnitStatusContextType = {
  statuses: { [unitName: string]: never };
  setUnitStatus: (unitName: string, status: never) => void;
};

const UnitStatusContext = createContext<UnitStatusContextType | undefined>(undefined);

export const UnitStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [statuses, setStatuses] = useState<{ [unitName: string]: never }>({});
  const { selectedSite } = useSitesContext();

  const setUnitStatus = (unitName: string, stat: never) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [unitName]: stat
    }));
  };

  useEffect(() => {
    const fetchDeployedUnitsStatus = () => {
      if (selectedSite) {
        const { deployed } = selectedSite;
        deployed.map((unit) => fetchUnitStatus(unit));
      }
    };

    fetchDeployedUnitsStatus();
    const interval = setInterval(fetchDeployedUnitsStatus, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, [selectedSite]);

  function fetchUnitStatus(uName: string) {
    // first get a short status from the controller
    controlApi(selectedSite, `unit/${uName}/minimal_status`)
      .then((shortStatus) => {
        if (shortStatus.detected) {
          // the unit is accessible, get the full status
          unitApi(uName, 'status').then((fullStatus) => {
            setStatuses((prevStatus) => ({ ...prevStatus, [uName]: fullStatus }));
          });
        } else {
          // keep the mini status
          shortStatus.type = 'short';
          setStatuses((prevStatus) => ({ ...prevStatus, [uName]: shortStatus }));
        }
      })
      .catch(() => {
        setStatuses((prevStatus) => ({ ...prevStatus, [uName]: { type: 'short', detected: false, powered: false } }));
      });
  }

  const value = useMemo(
    () => ({
      statuses,
      setUnitStatus
    }),
    [statuses]
  );

  return <UnitStatusContext.Provider value={value}>{children}</UnitStatusContext.Provider>;
};

export const useUnitStatusContext = () => {
  const context = useContext(UnitStatusContext);
  if (!context) {
    throw new Error('useUnitStatusContext must be used within a SitesProvider');
  }
  return context;
};
