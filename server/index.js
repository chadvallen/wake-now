const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
const UC = require('./user_controller');
const PC = require('./products_controller');
var stripe = require("stripe")("sk_test_AmvwHBSroJSEUm4Y9TLxJ746");

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
app.use(bodyParser.json())
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));
app.use( express.static( `${__dirname}/../build` ) );

app.get('/auth/callback', UC.login);
    
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
  });
  
app.get('/api/user-data', (req, res) => {
  // console.log('req.session--->', req.session)
    res.json({ user: req.session.user });
  });

app.get('/session/cart', (req, res) => {
  res.json({cart: req.session.cart})
})

app.post('/session/cart', (req, res) => {
  req.session.cart.push(req.body);
  // console.log('this is my session w cart', req.session)
  res.json({cart: req.session.cart}) 
})

app.delete('/session/cart/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = req.session.cart.findIndex(item => {
    return item.id === parseInt(productId)
  });
  if (productIndex === -1) {
    res.status(404).send(`Error, product ${productIndex} is not found`)
  } else {
    req.session.cart.splice(productIndex, 1);
    res.status(200).json(req.session.cart)
  }
})
  
app.get('/api/products/wakeboards', PC.getWakeboards);
app.get('/api/products/waterskis', PC.getWaterskis);
app.get('/api/products/tubes', PC.getTubes);
app.get('/api/products/lifevests', PC.getLifevests);
app.get('/api/products/:id', PC.getProductDetail);
app.post('/api/products', PC.addProduct);
app.put('/api/products/:id', PC.updatePrice);
app.delete('/api/products/:id', PC.removeProduct);

app.post('/api/stripe', (req, res) => {
  const token = req.body.body.id;
  stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'Order Id',
      source: token
    },
    function(err, charge) {
      // console.log('charge', charge)
      if(err){
        res.send({
            success: false,
            message: 'Error'
        })
      } else {
        res.send({
        success: true,
        message: 'Success'
     })}
      }
    );  
})

app.post('/api/orders', (req, res) => {
  const db = req.app.get('db');
  const { name, shipping_address, city, state_name, zipcode, user_id } = req.body;
  db.add_to_orders(name, shipping_address, city, state_name, zipcode, user_id).then(order => {
    res.status(200).send(order)
  }).catch(error => {
    console.log('Error on addToOrders', error)
  })
})

app.post('/api/line_items', (req, res) => {
  const db = req.app.get('db');
  const { order_id, product_id } = req.body;
  db.add_to_line_items(order_id, product_id).then(item => {
    res.status(200).send(item)
  }).catch(error => {
    console.log('Error on addToLineItems', error)
  })
  req.session.cart = [];
})

app.get('/api/admin_table', (req, res) => {
  const db = req.app.get('db');
  db.get_admin_table().then(orders => {
    res.status(200).send(orders)
  }).catch(error => {
    console.log('Error on getAdminTable', error)
  })
})

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4600;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚤`)
})
