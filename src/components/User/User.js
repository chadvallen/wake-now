import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';
import axios from 'axios';
import '../../App';

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
    return (
      <div>
         <div>
         { loggedIn 
          ?
          <div className="flex-parent-user">
              <h1>User Info</h1>
              {console.log(user.user)}
              <img src={user.user.picture} alt={user.user.profile_name} className="user-img" />
              <h2>{user.user.profile_name}</h2>
              <p>{user.user.email}</p>
              <button onClick={this.logout}>Log Out</button>
          </div>
          : <div>
              <p>Not loged in</p>
              <button onClick={this.login}>Log in</button>
            </div>
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