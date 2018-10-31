import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ShoppingCart extends Component {
  constructor(){
    super();
    this.state = {
      cart: []
    }
  }

  componentDidMount() {
    this.displayCart();
  }

  login = () => {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    window.location = url;
    
  }

  displayCart = () => {
    axios.get('/session/cart').then(res => {
      console.log(res.data.cart)
      this.setState({cart: res.data.cart})
    })
  }

  render() {

    const { user, loggedIn } = this.props
    return (
      <div>
        <h2>Cart</h2>
        {console.log(loggedIn)}
        { loggedIn 
          ?
          <div>
              <h3>Name: {user.user.profile_name}</h3>
              <img src={user.user.picture} alt="user"/>
            {this.state.cart.map(item => {
              return (
                <div key={item.id} >
                  <h3>{item.name}</h3>
                  <img src={item.image_url}  />
                  <p>{item.description}</p>
                  <h5>${item.price}</h5>
                </div>
              )
            })}
          </div>
          : <div>
              <p>Not loged in</p>
              <p>Please <button onClick={this.login}>login</button></p>
              </div>}
        {console.log("this.props.user--->", user)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, loggedIn } = state;
  return {
    user,
    loggedIn
  }
}

export default connect(mapStateToProps)(ShoppingCart);