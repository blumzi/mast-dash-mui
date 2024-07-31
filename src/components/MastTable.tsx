import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

const MastCell = ({ children, sx }) => {
  return <TableCell sx={{ borderBottom: 'none', ...sx }}>{children}</TableCell>;
};

MastCell.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
};

MastCell.defaultProps = {
  sx: {}
};

export const MastRow = ({ children, cellStyles }) => {
  if (React.Children.count(children) !== 4) {
    console.error('TableRow4Cells requires exactly four children.');
    return null;
  }

  const [child1, child2, child3, child4] = React.Children.toArray(children);

  const defaultCellStyles = [{ width: '20px', padding: 'none' }, { padding: 'none' }, { padding: 'none' }, { padding: 'none' }];

  const combinedCellStyles = defaultCellStyles.map((defaultStyle, index) => ({ ...defaultStyle, ...(cellStyles[index] || {}) }));
  return (
    <TableRow sx={{ borderBottom: 'none', padding: 'none', minHeight: '10px', maxHeight: '10px' }}>
      <MastCell sx={combinedCellStyles[0]}>{child1}</MastCell>
      <MastCell sx={combinedCellStyles[1]}>{child2}</MastCell>
      <MastCell sx={combinedCellStyles[2]}>{child3}</MastCell>
      <MastCell sx={combinedCellStyles[3]}>{child4}</MastCell>
    </TableRow>
  );
};
MastRow.propTypes = {
  children: PropTypes.node.isRequired,
  cellStyles: PropTypes.arrayOf(PropTypes.object)
};

MastRow.defaultProps = {
  cellStyles: [{}, {}, {}, {}]
};
