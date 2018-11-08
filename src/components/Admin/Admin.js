import React, { Component } from 'react'
import { connect } from 'react-redux';
import { isLoggedIn } from '../../ducks/reducer';
import axios from 'axios';
import './Admin.css';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.getAdminTable();
    }

    getAdminTable = () => {
        axios.get('/api/admin_table').then(res => {
            // console.log(res.data)
            this.setState({orders: res.data})
        })
    }

  render() {
      const { loggedIn, user } = this.props
      let productList = this.state.orders.map(item => {
          return (
              <div className="parent">
                <div className="child">{item.order_id} </div>
                <div className="child">{item.product_id} </div>
                <div className="child">{item.name} </div>
                <div className="child">{item.shipping_address} </div>
                <div className="child">{item.city} </div>
                <div className="child">{item.state_name} </div>
                <div className="child">{item.zipcode} </div>
              </div>
          )
      })
    return (
      <div>
        <h1 className="admin-header">Admin View</h1>
        {
            loggedIn && user.user.admin
            ?
            <div>
            <div className="parent">
                <div className="child">Order Id </div>
                <div className="child">Product Id </div>
                <div className="child">Name </div>
                <div className="child">Shipping Address </div>
                <div className="child"> City </div>
                <div className="child">State </div>
                <div className="child">Zipcode</div>
            </div>
            {productList}
            </div>
            :
            <h2>You are not an admin</h2>
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

export default connect(mapStateToProps, {isLoggedIn})(Admin);
