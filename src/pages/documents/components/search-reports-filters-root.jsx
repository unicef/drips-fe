import React, { useEffect, useRef } from 'react';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

import { prop } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Paper } from '@material-ui/core';

import useFilterStyles from 'styles/filter-styles';
import { onFetchSearchReports } from 'actions';
import SearchFilterMenuButton from './search-filter-menu-button';

import useFiltersQueries from 'lib/use-filters-queries';
import { FORM_CONFIG } from 'lib/constants';
import { FILTERS_MAP } from '../lib/search-filters-map';
import { selectMenuBarPage } from 'selectors/ui-flags';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function SearchReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const pageName = useSelector(selectMenuBarPage);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(onFetchSearchReports(filterValues));
  }

  function handleClear() {
    clearFilters();
    dispatch(onFetchSearchReports({}));
  }

  const {
    handleSelectFilter,
    handleChangeFilterValue,
    filtersActiveState,
    filterValues,
    selectedFilters,
    clearFilters
  } = useFiltersQueries(FILTERS_MAP);

  useEffect(() => {
    if (pageName) {
      dispatch(onFetchSearchReports(filterValues));
    }
  }, [pageName]);

  const prevPageName = usePrevious(pageName);

  useEffect(() => {
    if (prop('length', prevPageName)) {
      clearFilters();
      dispatch(onFetchSearchReports({}));
    }
  }, [pageName]);

  return (
    <>
      <Paper className={classes.filterPaper}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={0}
            alignItems="flex-end"
            direction="row"
          >
            <Grid item><SearchFilterMenuButton onSelectFilter={handleSelectFilter} selected={filtersActiveState} /></Grid>
          </Grid>
          <Box display="flex" flex="1 1 auto" alignItems="flex-start" flexWrap="wrap">
            <Grid
              className={classes.filterComponents}
              container
              direction="row"
              flex="1 1 auto"
              spacing={2}
            >
              {selectedFilters.map((filter, idx) => {
                const { Component: FilterComponent } = FILTERS_MAP[filter];

                return (
                  <Grid
                    item
                    className={classes.filterBox}
                    sm={FILTERS_MAP[filter].gridSize || 3}
                    key={idx}
                  >
                    <FilterComponent
                      onChange={handleChangeFilterValue(filter)}
                      value={filterValues[filter]}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Grid container alignContent="flex-start" className={classes.button}>
            <Button className={classes.formBtn} variant="contained" color="secondary" onClick={handleClear}>
              {FORM_CONFIG.clear.label}
            </Button>
            <Button className={classes.formBtn} variant="contained" color="secondary" onClick={handleSubmit}>
              {FORM_CONFIG.submit.label}
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

      // ReportsFilter.whyDidYouRender = true;
