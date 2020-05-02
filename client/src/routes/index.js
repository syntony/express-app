import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import StoreList from '../components/Store/StoreList'

export default () => (
  <Switch>
    <Route exact path="/" component={() => <StoreList />} />
    <Redirect exact to="/" />
  </Switch>
)
