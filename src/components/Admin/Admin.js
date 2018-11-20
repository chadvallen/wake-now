import React, { Component } from 'react'
import { connect } from 'react-redux';
import { isLoggedIn } from '../../ducks/reducer';
import axios from 'axios';
import '../../App';

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

    addProduct = () => {
        let newProduct = {
            type: this.state.type,
            name: this.state.name,
            description: this.state.description,
            image_url: this.state.image_url,
            price: this.state.price
        }
        axios.post('/api/products', newProduct).then(() => {
            console.log('Product added')
        }).catch(error => {
            console.log('Error on addProduct FE', error)
        })
    }
    
    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { loggedIn, user } = this.props
        let productList = this.state.orders.map(item => {
            return (
                <div className="admin-parent" key={item.id}>
                    <div className="admin-child">{item.order_id} </div>
                    <div className="admin-child">{item.product_id} </div>
                    <div className="admin-child">{item.name} </div>
                    <div className="admin-child">{item.shipping_address} </div>
                    <div className="admin-child">{item.city} </div>
                    <div className="admin-child">{item.state_name} </div>
                    <div className="admin-child">{item.zipcode} </div>
                </div>     
            )
        })
    return (
        <div>
        <h2>Admin View</h2>
        {
            loggedIn && user.user.admin
            ?
            <div>
            <div className="admin-parent">
                <div className="admin-child">Order Id </div>
                <div className="admin-child">Product Id </div>
                <div className="admin-child">Name </div>
                <div className="admin-child">Shipping Address </div>
                <div className="admin-child"> City </div>
                <div className="admin-child">State </div>
                <div className="admin-child">Zipcode</div>
            </div>
            {productList}
            <div>
                { 
                loggedIn && user.user.admin 
                    ? <div className="add-product">
                        <h2>Add Product</h2>
                        <p>Type: </p><input name="type" onChange={event => this.handleInputs(event)}></input><br></br>
                        <p>Name: </p><input name="name" onChange={event => this.handleInputs(event)}></input><br></br>
                        <p>Description: </p><input name="description" onChange={event => this.handleInputs(event)}></input><br></br>
                        <p>Price: </p><input name="price" onChange={event => this.handleInputs(event)}></input><br></br>
                        <p>Image Url: </p><input name="image_url" onChange={event => this.handleInputs(event)}></input><br></br>
                        <button onClick={() => this.addProduct()}>Add Product</button>
                    </div>
                : console.log('Is not admin')
                }
            </div>
            </div>
            : <h2>You are not an admin</h2>
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
