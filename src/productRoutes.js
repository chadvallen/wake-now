import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Products from './components/Products/Products';



import Accessories from './components/Products/Accessories';
import ProductDetail from './components/Products/ProductDetail';
import Wakesurf from './components/Products/Wakesurf';
import Wakeboards from './components/Products/Wakeboards';
import Waterskis from './components/Products/Waterskis';
import Tubes from './components/Products/Tubes';
import LifeVests from './components/Products/LifeVests';


export default  
<Switch>
    <Route exact path='/products' component={Products} />
    <Route exact path='/products/wakeboard' component={Wakeboards} />
    <Route exact path='/products/waterski' component={Waterskis} />
    <Route exact path='/products/wakesurf' component={Wakesurf}/>
    <Route exact path='/products/tube' component={Tubes} />
    <Route exact path='/products/lifevest' component={LifeVests} />
    <Route exact path='/products/accessories' component={Accessories} />
    <Route path='/products/:type/:id' component={ProductDetail} />
</Switch>