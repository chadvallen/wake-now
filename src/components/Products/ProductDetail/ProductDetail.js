import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../../ducks/reducer';
import '../../../App';

class ProductDetail extends Component {
    constructor(){
        super();
        this.state = {
            product: [],
            price: 0
        }
    }

    componentDidMount(){
        this.displayProductDetail();
    }

    displayProductDetail = () => {
        axios.get(`/api/products/${this.props.match.params.id}`).then(res => {
            this.setState({product: res.data})
        })
    }

    addToCart = (id, name, image_url, description, price) => {
        axios.post('/session/cart', {id, name, image_url, description, price}).then(() => {
        console.log('Item added to cart');
        })
    }

    deleteProduct = (id) => {
        axios.delete(`/api/products/${id}`).then(() => {
            console.log('Product deleted')
        }).catch(error => {
            console.error('Error on deleteProduct FE', error)
        })
    }

    updatePrice = (price, id) => {
        axios.put(`/api/products/${id}`, {price}).then(() => {
            alert('Price Updated')
        }).catch(error => {
            console.error('Error on updatePrice FE', error)
        })
        this.displayProductDetail();
    }


    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }


  render() {
      const { user, loggedIn } = this.props;
      let product = this.state.product.map(item => {
          return (
              <div key={item.id}>
                  <h4 className="product-title">{item.name}</h4>
                  <img src={item.image_url} alt="product" className="detail-img"/>
                  <div className="detail-description">{item.description}</div>
                  <p>${item.price}</p>
                  <button onClick={() => this.addToCart(item.id, item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
                  <br></br>
                  <Link to={`/products/${item.type}s`} >Back</Link>
                  {
                    loggedIn && user.user.admin 
                    ? <div>
                        <button onClick={() => this.deleteProduct(item.id)}>Remove</button>
                        <p>Update Price: </p><input name='price' onChange={e => this.handleInputs(e)}></input>
                        {console.log(item.price, item.id)}
                        <button onClick={() => this.updatePrice(this.state.price, item.id)}>Update</button>
                    </div>
                    : console.log('Is not admin')
                  }
              </div>
          )
      })

    return (
      <div>
        {product}
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

export default connect(mapStateToProps, {isLoggedIn})(ProductDetail);