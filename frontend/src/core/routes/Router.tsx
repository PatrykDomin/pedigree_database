import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Dogs } from '../../features/Dogs'
import { Information } from '../../features/Information'
import { Breeding } from '../../features/Breeding'

export const Router = () => {
  return (
    <Switch>
      <Route path="/informacje">
        <Information />
      </Route>
      <Route path="/hodowle">
        <Breeding />
      </Route>
      <Route path="/psy">
        <Dogs />
      </Route>
      <Route path="*">
        <Redirect to="/psy" />
      </Route>
    </Switch>
  )
}
