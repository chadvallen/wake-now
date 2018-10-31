import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';

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
      <div>
        <nav>
          <Link to='/'><button>Home</button></Link>
          <Link to='/products'><button>Products</button></Link>
          <Link to='/cart'><button>Cart</button></Link>
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