import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function ProgramOfficerFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Program Officer"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        onChange={onChange}
        value={value}
        label="Program Officer"
      />
    </FormControl>
  );
}

ProgramOfficerFilter.propTypes = FilterProps;
