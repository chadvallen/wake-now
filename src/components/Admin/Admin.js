import React, { Component } from 'react'
import { connect } from 'react-redux';
import { isLoggedIn } from '../../ducks/reducer';
import axios from 'axios';
import '../../App';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            dates: []
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
            let splitArr = item.stamp.split('T')
            let date = splitArr[0]
            let splitDate = date.split('-')
            let newArr = []
            newArr.push(splitDate[1])
            newArr.push(splitDate[2])
            newArr.push(splitDate[0])
            let finalDate = newArr.join('-');
            return (
                <div className="admin-parent" key={item.id}>
                    {console.log(item)}
                    <div className="admin-child">{finalDate}</div>
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
        <h1>Admin View</h1>
        {
            loggedIn && user.user.admin
            ?
            <div>
            <div className="admin-parent">
                <div className="admin-child">Date</div>
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
                    ? <div>
                        <h2>Add Product</h2>
                        <div className="add-product">
                            <p>Type: </p><input name="type" onChange={event => this.handleInputs(event)}></input>
                            <p>Name: </p><input name="name" onChange={event => this.handleInputs(event)}></input>
                            <p>Description: </p><textarea name="description" onChange={event => this.handleInputs(event)}></textarea>
                            <p>Price: </p><input name="price" onChange={event => this.handleInputs(event)}></input>
                            <p>Image Url: </p><input name="image_url" onChange={event => this.handleInputs(event)}></input>
                        </div>
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
