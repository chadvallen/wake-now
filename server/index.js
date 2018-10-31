const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
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
  console.log('this is my session w cart', req.session)
  res.json({cart: req.session.cart}) 
})
  
app.get('/api/products/wakeboards', PC.getWakeboards);
app.get('/api/products/waterskis', PC.getWaterskis);
app.get('/api/products/tubes', PC.getTubes);
app.get('/api/products/lifevests', PC.getLifevests);



const PORT = 4600;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚤`)
})
