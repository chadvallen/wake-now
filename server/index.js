const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
const UC = require('./user_controller');
const PC = require('./products_controller');

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

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4600;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚤`)
})
