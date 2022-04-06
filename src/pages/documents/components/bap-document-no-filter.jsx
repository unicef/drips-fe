import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function BapDocumentNoFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="BAP Document No"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        onChange={onChange}
        value={value}
        label="BAP Document No"
      />
    </FormControl>
  );
}

BapDocumentNoFilter.propTypes = FilterProps;
