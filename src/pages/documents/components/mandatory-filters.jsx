import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import useFilterStyles from 'styles/filter-styles';
import { parseEventValue } from 'lib/helpers';
import { setCurrentlyLoadedDonor } from 'slices/ui';
//@dci REMOVE
export default function MandatoryFilters() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();

  useEffect(() => {
    return function cleanup() {
      dispatch(setCurrentlyLoadedDonor(''))
    }
  }, [])

  return (
    <Grid item style={{ width: '100%' }}>
      <Grid item className={classes.filterBox} />
    </Grid>
  );
}
