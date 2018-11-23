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

    componentDidMount() {
        this.getUserOrders();
    }

    getUserOrders = () => {
        console.log('this.props.user',this.props.user)
        this.props.user !== null && this.props.loggedIn 
        ?
        axios.get(`/api/admin_table/${this.props.user.user.id}`).then(response => {
            console.log('response.data--->', response.data)
            this.setState({orders: response.data})
        }).catch(error => {
            console.log('Error on getUserOrders FE', error)
        })
        :
        console.log('User null')
    }

render() {
    console.log('ORDERS', this.state.orders)
    const { loggedIn, user } = this.props;
    let order = this.state.orders.map(item => {
        let splitArr = item.stamp.split('T')
        let date = splitArr[0]
        let splitDate = date.split('-')
        let newArr = []
        newArr.push(splitDate[1])
        newArr.push(splitDate[2])
        newArr.push(splitDate[0])
        let finalDate = newArr.join('-')

        return (
            <div className="orders-parent detail-bg">
                
                <div className="orders-date">{finalDate}</div>
                <div className="flex-orders">
                    <div><img src={item.image_url} alt={item.name} className="orders-img"/></div>
                    <div className="orders-details">
                        <div>{item.name}</div>
                        <div className="orders-address">
                            <div className="orders-name">{user.user.profile_name}</div>
                            <div>{item.shipping_address}</div>
                            <div>{item.city}, {item.state_name} {item.zipcode}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
    <div>
        { this.state.orders.length > 0
            ?
            <div>
                {loggedIn && user.user 
                ?
                <div>
                    <h1>Order History</h1>
                    {console.log(user)}
                    <h4>{user.user.profile_name}</h4>
                    {order}
                </div>
                :
                <h2>Loading...</h2>}
            </div>
            :
            <div>
                <h1>No orders placed</h1>
            </div>
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