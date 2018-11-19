import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Wakeboards from './components/Products/Wakeboards';
import Waterskis from './components/Products/Waterskis';
import Tubes from './components/Products/Tubes';
import LifeVests from './components/Products/LifeVests';
import ProductDetail from './components/Products/ProductDetail';

export default  
<Switch>
    <Route exact path='/products' component={Products} />
    <Route exact path='/products/wakeboards' component={Wakeboards} />
    <Route exact path='/products/waterskis' component={Waterskis} />
    <Route exact path='/products/tubes' component={Tubes} />
    <Route exact path='/products/lifevests' component={LifeVests} />
    <Route path='/products/:type/:id' component={ProductDetail} />
</Switch>