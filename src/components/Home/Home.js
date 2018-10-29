import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
          user: null,
        };
      }
    
      componentDidMount() {
        axios.get('/api/user-data').then(response => {
          console.log(response.data)
          this.setState({ user: response.data || null })
        });
      }
    
      login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
        window.location = url;
        
      }
    
      logout = () => {
        axios.post('/api/logout').then(() => {
          this.setState({ user: null });
        });
      }

  render() {
    return (
      <div>
        <h1>HOME</h1>
        <div className="section">
            <button onClick={this.login}>Log in</button>
            {' '}
            <button onClick={this.logout}>Log out</button>
        </div>
      </div>
    )
  }
}
