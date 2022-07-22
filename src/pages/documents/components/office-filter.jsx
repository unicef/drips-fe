//import { selectCostCenter } from 'selectors/collections';
//import SearchableDropdownFilterFactory from '../lib/searchable-dropdown-filter-factory';

// export default SearchableDropdownFilterFactory(selectCostCenter, 'Office', 'description', 'code');

import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function OfficeFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Office"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        onChange={onChange}
        value={value}
        label="Office"
      />
    </FormControl>
  );
}

OfficeFilter.propTypes = FilterProps;
