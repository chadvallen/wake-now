import React, { Component } from 'react';
import axios from 'axios';


export default class ProductDetail extends Component {
    constructor(){
        super();
        this.state = {
            product: []
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

  render() {
      let product = this.state.product.map(item => {
          return (
              <div key={item.id}>
                  <h4 className="product-title">{item.name}</h4>
                  <img src={item.image_url} alt="product" />
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <button onClick={() => this.addToCart(item.id, item.name, item.image_url, item.description, item.price)}>Add to Cart</button>

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
