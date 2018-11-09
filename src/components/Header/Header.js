import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';
import headerLogo from '../../media/white-logo.png';
import wakenow from '../../media/wakenow.png';
import cartLogo from '../../media/cart.png';
import menu from '../../media/menu.png';
import '../../App.scss'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggleNav: false
    }
  }

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

  toggle = () => {
    this.setState((prevState) => {
      return {
        toggleNav: !prevState.toggleNav
      }
    })
    console.log(this.state.toggleNav)
  }

  render() {
    return (
      <div className="header">
        <Link style={{ textDecoration: 'none' }} to='/'>
          <div className="flex-parent">
            <img className="header-logo" src={headerLogo} alt='logo'/>
            <img className="wakenow-logo" src={wakenow} alt="wake now logo" />
          </div>
        </Link>

        <img onClick={this.toggle} className="nav-button" src={menu} alt="nav button" />

        <nav className={this.state.toggleNav ? 'show' : ''}>
          <div className="nav-links">
            <Link style={{ textDecoration: 'none' }} to='/'><p>HOME</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/products'><p>PRODUCTS</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/user'><p>USER</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/contact'><p>CONTACT</p></Link>
            <Link style={{ textDecoration: 'none' }} to='/cart'><img className="cart-logo" src={cartLogo} alt='cart' /></Link>
          </div>
        </nav>
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