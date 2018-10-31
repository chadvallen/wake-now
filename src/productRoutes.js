import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Wakeboards from './components/Products/Wakeboards/Wakeboards';
import Waterskis from './components/Products/Waterskis/Waterskis';
import Tubes from './components/Products/Tubes/Tubes';
import LifeVests from './components/Products/LifeVests/LifeVests';

export default  <Switch>
    <Route exact path='/products' component={Products} />
    <Route path='/products/wakeboards' component={Wakeboards} />
    <Route path='/products/waterskis' component={Waterskis} />
    <Route path='/products/tubes' component={Tubes} />
    <Route path='/products/lifevests' component={LifeVests} />
</Switch>