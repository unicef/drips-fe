// import SearchableDropdownAsyncFilterFactory from '../lib/searchable-dropdown-async-filter-factory';
// import {get} from '../../../api/search-index';

// const getDataAsynchronously = (searchText) => {
//   return get('/ip-metadata/', {code__startswith: searchText});
// }

// export default SearchableDropdownAsyncFilterFactory(getDataAsynchronously, 'IP No', 'code', 'code')


import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function IPNoFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="IP No"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        onChange={onChange}
        value={value}
        label="IP No"
      />
    </FormControl>
  );
}

IPNoFilter.propTypes = FilterProps;
