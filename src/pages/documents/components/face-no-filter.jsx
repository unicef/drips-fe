import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function FaceNoFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="FACE No"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        onChange={onChange}
        value={value}
        label="FACE No"
      />
    </FormControl>
  );
}

FaceNoFilter.propTypes = FilterProps;
