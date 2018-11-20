import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin, isLoggedIn } from '../../ducks/reducer';

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    getUserOrders = () => {
        console.log('this.props.user',this.props.user)
        axios.get(`/api/admin_table/${this.props.user.user.id}`).then(response => {
            console.log('response.data--->', response.data)
            this.setState({orders: response.data})
        }).catch(error => {
            console.log('Error on getUserOrders FE', error)
        })
    }

render() {
    const { loggedIn, user } = this.props;
    let order = this.state.orders.map(item => {
        return (
            <div className="orders-parent detail-bg">
                {console.log(item)}
                <div className="orders-child">{item.name}</div>
                <div className="orders-child"><img src={item.image_url} alt={item.name} className="detail-img"/></div>
                <div className="orders-child">
                    <div>{item.shipping_address}</div>
                    <div>{item.city}, {item.state_name} {item.zipcode}</div>
                </div>
            </div>
        )
    })
    return (
    <div>
        { loggedIn ?
        <div>
        <h1>Order History</h1>
        {console.log(user)}
        <h3>{user.user.profile_name}</h3>
        <button onClick={() => this.getUserOrders()}>Click to display orders</button>
        {order}
        </div>
        :
        <h2>Not logged In</h2>
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

export default connect(mapStateToProps, { userLogin, isLoggedIn })(Orders)