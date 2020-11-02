import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Information from '../../features/Information'

export const Router = () => {
  return (
    <Switch>
      <Route path="/informacje">
        <Information />
      </Route>
      <Route path="/hodowle"> HODOWLE </Route>
      <Route path="/psy"> PSY </Route>
      <Route path="*">
        <Redirect to="/psy" />
      </Route>
    </Switch>
  )
}
