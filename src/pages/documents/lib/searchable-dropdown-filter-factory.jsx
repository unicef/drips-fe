import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose, equals } from 'ramda';

import { useSelector } from 'react-redux';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    '&> :first-child': {
      margin: 0
    }
  }
});

export default function SearchableDropdownFilterFactory(selector, label, getValueFromObj, textField) {
  const Component = ({ value = '', onChange, ...props }) => {
    const { classes } = useGetFilterClasses();
    const options = useSelector(selector) || [];
    const [dropdownValue, setDropdownValue] = useState(null);
    const localClasses = useStyles();

    useEffect(() => {
      const val = options.find(
        compose(
          equals(value),
          getValueFromObj
        )
      );
      setDropdownValue(val);
    }, [value, options]);

    const filterOptions = createFilterOptions({
      stringify: option => option[textField],
    });

    return (
      <FormControl className={classes.formControl}>
        <Autocomplete
          options={options}
          filterOptions={filterOptions}
          value={dropdownValue}
          className={clsx(localClasses.root, classes.textField)}
          getOptionLabel={(option) => option[textField]}
          onChange={(event, newValue) => {
            onChange(getValueFromObj(newValue));
          }}
          renderInput={params => <TextField className={classes.input} {...params} label={label} margin="normal" fullWidth  />}
          {...props}
        />
      </FormControl>
    );
  };
  Component.propTypes = FilterProps;
  return Component;
}

SearchableDropdownFilterFactory.propTypes = {
  selector: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  getValueFromObj: PropTypes.func.isRequired
};

export const FilterProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  filterProp: PropTypes.string
};
