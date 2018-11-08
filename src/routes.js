import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import User from './components/User/User';
import Admin from './components/Admin/Admin';

export default
<Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/products' component={Products} />
    <Route path='/user' component={User} />
    <Route path='/cart' component={ShoppingCart} />
    <Route path='/admin' component={Admin} />
</Switch>