import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

export default
<Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/products' component={Products} />
    <Route path='/cart' component={ShoppingCart} />
</Switch>