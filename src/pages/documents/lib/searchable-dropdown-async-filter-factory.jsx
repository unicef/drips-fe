import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import { debounce } from '../../../lib/helpers';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    '&> :first-child': {
      margin: 0
    }
  }
});

export default function SearchableDropdownAsyncFilterFactory(getDataAsynchronously, label, textField, valueField) {
  const Component = ({  value = '', onChange, ...props }) => {
    const { classes } = useGetFilterClasses();
    const [dropdownValue, setDropdownValue] = useState(null);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState(null);
    const localClasses = useStyles();

    useEffect(() => {
      const val = options.find(x => (x[valueField] || x) === value);
      setDropdownValue(val);
    }, [value, options]);

     useEffect(() => {
        if (!inputValue) {
          setOptions(noInputOptions(value))
          return undefined;
        }
        getDataAsynchronously(inputValue).then((resp) => setOptions(resp));
     }, [inputValue]);

     const noInputOptions = (val) => {
      if(val) {
        return val[textField] ? [val] : [{[textField]: val, [valueField]: val}];
      }
      return [];
     }

    const onInputChanged = (val) => {
      setInputValue(val);
    }

    const onInputChangedDebounce = useCallback(debounce(onInputChanged, 500), []);

    return (
      <FormControl className={classes.formControl}>
        <Autocomplete
          options={options}
          value={dropdownValue}
          className={clsx(localClasses.root, classes.textField)}
          getOptionLabel={(option) => option ? option[textField] : ''}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            onChange(newValue ? newValue[valueField] : '')
          }}
          onInputChange={(event, newInputValue) => {
            onInputChangedDebounce(newInputValue);
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

SearchableDropdownAsyncFilterFactory.propTypes = {
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
