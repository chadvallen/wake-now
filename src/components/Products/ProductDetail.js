import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../ducks/reducer';
import arrow from '../../media/back.png';


import '../../App';

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
        alert('Item added to cart');
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

    login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
        window.location = url;
    }


    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }

render() {
    const { user, loggedIn } = this.props;
    let product = this.state.product.map(item => {
        return (
            <div key={item.id} className="flex-parent-user">
                <img className="back" src={arrow} alt="back" onClick={() => this.props.history.goBack()}/>
                <div className="detail-bg">
                    <img src={item.image_url} alt="product" className="detail-img"/>
                </div>
                    <h1>{item.name}</h1>
                    <div><p className="detail-description">{item.description}</p></div>
                    <p className="detail-price">${item.price}</p>
                { loggedIn === false
                ? <Link to='/user'><button>Log in to add to cart</button></Link>
                : <button onClick={() => this.addToCart(item.id, item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
                }
                <br></br>
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

export default withRouter(connect(mapStateToProps, {isLoggedIn})(ProductDetail));