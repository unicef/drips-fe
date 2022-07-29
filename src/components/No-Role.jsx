import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export default function NoRole() {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView()
  }, []);

  return (
    <Grid container justify="center" align="center">
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Unassigned Role
          </Typography>
            <Typography variant="h5" component="h2" />
            <Typography>You currently do not have access to Document Repository of Implementing Partners Portal, please reach out your focal point.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  );
}
