import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function IPNoFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl style={{width: '100%'}} className={classes.formControl} {...props}>
      <TextField
        placeholder="IP No"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        fullWidth
        onChange={onChange}
        value={value}
        label="IP No"
      />
    </FormControl>
  );
}

IPNoFilter.propTypes = FilterProps;
