import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';

class Home extends Component {

    

    
      login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
        window.location = url;
        
      }
    
      logout = () => {
        axios.post('/api/logout').then(() => {
          this.props.userLogin(null)
        });
      }

  render() {
    const { user } = this.props;
    return (
      
      <div>
        {/* console.log(user) */}
        <h1>HOME</h1>
        <div className="section">
            <button onClick={this.login}>Log in</button>
            {' '}
            <button onClick={this.logout}>Log out</button>
            {/* <div>Name: {user.name}</div>
            <div>Email: {user.name}</div> */}
            {console.log('user---->', user)}
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

export default connect(mapStateToProps, {userLogin, isLoggedIn})(Home);