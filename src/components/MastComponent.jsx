import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

class MastComponent extends React.Component {
  constructor(props) {
    super(props);
    if (new.target === MastComponent) {
      throw new Error('MastComponent is abstract, cannot instantiate');
    }

    // check implementation of abstract methods
    if (this.summary === undefined) {
      throw new TypeError('a MastComponent summary() must be implemented');
    }
    if (this.configs === undefined) {
      throw new TypeError('a MastComponent configs() must be implemented');
    }
    if (this.controls === undefined) {
      throw new TypeError('a MastComponent controls() must be implemented');
    }
  }
  summary() {
    throw new Error('MastComponent summary() must be implemented');
  }
  configs() {
    throw new Error('MastComponent configs() must be implemented');
  }
  controls() {
    throw new Error('MastComponent controls() must be implemented');
  }

  render() {
    const controls = this.controls();
    const configs = this.configs();
    const summary = this.summary();

    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>{summary}</AccordionSummary>
        <AccordionDetails>
          {controls && (
            <Box component="fieldset">
              <legend>Controls</legend>
              {controls}
            </Box>
          )}
          {configs && (
            <Box component="fieldset">
              <legend>Configuration</legend>
              {configs}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default MastComponent;
