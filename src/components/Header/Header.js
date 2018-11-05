import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';
import './Header.css';
import cartLogo from '../../media/cart.png';
import headerLogo from '../../media/white-logo.png';

class Header extends Component {

  componentDidMount() {
    axios.get('/api/user-data').then(response => {
      this.props.userLogin(response.data)
      if (response.data.user) {
      this.props.isLoggedIn(true)
      }
    }).catch(error => {
      console.error('Error on /api/user-data', error);
    });
  }

  render() {
    return (
      <div className="header">
      <Link style={{ textDecoration: 'none' }} to='/'>
      <div className="flex-parent">
        <img className="header-logo" src={headerLogo} alt='logo'/>
          <p className="header-title">WAKE NOW</p>
          </div>
          </Link>
          <div>
          <nav className="links">
            <Link style={{ textDecoration: 'none' }} to='/'><p>HOME</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/products'><p>PRODUCTS</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/user'><p>USER</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/cart'><img className="cart-logo" src={cartLogo} alt='cart' /></Link>
          </nav>
        </div>
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

export default connect(mapStateToProps, { userLogin, isLoggedIn })(Header);