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
              <div className="parent" key={item.id}>
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
            <div>
                { 
                loggedIn && user.user.admin 
                ? <div className="inputs">
                        <h1 className="admin-header">Add Product</h1>
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
            : <h2 className="admin-header">You are not an admin</h2>
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
