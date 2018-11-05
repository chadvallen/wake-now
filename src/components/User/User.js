import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';
import axios from 'axios';
import './User.css';

class User extends Component {

  login = () => {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    window.location = url;
  }

  logout = () => {
    axios.post('/api/logout').then(() => {
      console.log('Logged out')
      this.props.isLoggedIn(false)
    });
  }

  render() {
    const { user, loggedIn } = this.props;
    console.log(user)
    return (
      <div>
         <div>
         { loggedIn 
          ?
          <div>
              <h3 className="user-name" >Name: {user.user.profile_name}</h3>
              <img src={user.user.picture} alt={user.user.profile_name} className="user-img" />
          </div>
          : <div>
              <p>Not loged in</p>
            </div>
        }
          { loggedIn
            ? <button onClick={this.logout}>Log Out</button>
            : <button onClick={this.login}>Log in</button>
          }
          {
            loggedIn && user.user.admin 
            ? <p>Is admin</p>
            : ''
          }
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

  export default connect(mapStateToProps, {userLogin, isLoggedIn})(User)