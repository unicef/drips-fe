import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';
import clsx from 'clsx';

export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, cells } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {cells.map(headCell => (
          <TableCell
            className={clsx(classes.cell)}
            key={headCell.id}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
                <span>{headCell.label}</span>
              )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired
};
