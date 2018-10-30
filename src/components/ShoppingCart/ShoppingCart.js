import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShoppingCart extends Component {
  render() {
    const { user, loggedIn } = this.props
    return (
      <div>
        <h2>Cart</h2>
        {console.log(loggedIn)}
        { loggedIn 
          ? <div>Is logged in</div>
          : <p>Not loged in</p>}
        {console.log("this.props.user--->", user)}
        { user
            ? <div>
              <h3>Name: {user.user.profile_name}</h3>
              <img src={user.user.picture} alt="user"/>
              </div>
            : <p>Not loged in</p>
        }
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