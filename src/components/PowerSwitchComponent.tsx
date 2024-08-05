import React from 'react';
import { useSitesContext } from '../contexts/SitesContext';
import { useUnitStatusContext } from '../contexts/UnitStatusContext';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import { isEmpty } from 'lodash';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { isEmptyObject } from './Utils';

type Outlet = {
  name: string;
  state: string;
};

export function PowerSwitchComponent() {
  const { selectedUnit } = useSitesContext();
  const { statuses } = useUnitStatusContext();

  if (isEmpty(statuses) || isEmptyObject(statuses[selectedUnit])) return;

  const unitStatus = statuses[selectedUnit];
  const switchName = selectedUnit.replace(/mast/, 'mastps') + '.weizmann.ac.il';
  const outlets: Outlet[] = unitStatus[switchName].outlets;
  const canUseControls: boolean = false; // should come from userContext

  return (
    <Accordion>
      <AccordionSummary>
        <Stack direction="row" alignItems="center">
          <Typography variant={'h6'} sx={{ width: '110px' }}>
            Switch
          </Typography>
          <FormGroup row>
            {Object.keys(outlets).map((key: string) => (
              <FormControlLabel
                key={key}
                control={<Checkbox enabled={canUseControls} checked={outlets[key].state === 'ON'} />}
                label={outlets[key].name}
              />
            ))}
          </FormGroup>
        </Stack>
      </AccordionSummary>
      <AccordionDetails />
    </Accordion>
  );
}
