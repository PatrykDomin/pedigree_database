import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Dog } from '../../features/Dog';
import { Dogs } from '../../features/Dogs';
import { Information } from '../../features/Information';
import { Breeding } from '../../features/Breeding';

export const Router = () => {
  return (
    <Switch>
      <Route path="/informacje" exact>
        <Information />
      </Route>
      <Route path="/hodowle" exact>
        <Breeding />
      </Route>
      <Route path="/psy" exact>
        <Dogs />
      </Route>
      <Route path="/psy/:pkr" exact>
        <Dog />
      </Route>
      <Route path="*">
        <Redirect to="/informacje" />
      </Route>
    </Switch>
  );
};
