import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { SPECIFIC_STORE_URL } from '../constants/common'
import StoreList from '../components/Store/StoreList'
import StorePage from '../components/Store/StorePage'

export default () => (
  <Switch>
    <Route exact path="/" component={() => <StoreList />} />
    <Route exact path={`/${SPECIFIC_STORE_URL}/:id`} component={() => <StorePage />} />
    <Redirect exact to="/" />
  </Switch>
)
