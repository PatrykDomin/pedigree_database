import React from 'react'
import { Switch, Route } from 'react-router-dom'

export const Router = () => {
  return (
    <Switch>
      <Route path="/informacje"> INFORMACJE </Route>
      <Route path="/hodowle"> HODOWLE </Route>
      <Route path="/psy"> PSY </Route>
      <Route path="*"> 404 </Route>
    </Switch>
  )
}
