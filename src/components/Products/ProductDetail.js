import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../ducks/reducer';
import { ToastContainer, toast } from 'react-toastify';
import '../../sass/toastify.css';
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
        
        })
        this.notify();
    }

    deleteProduct = (id) => {
        axios.delete(`/api/products/${id}`).then(() => {
            console.log('Product deleted')
        }).catch(error => {
            console.error('Error on deleteProduct FE', error)
        })
        this.notifyDeleted()
        
    }

    updatePrice = (price, id) => {
        axios.put(`/api/products/${id}`, {price}).then(() => {
            
        }).catch(error => {
            console.error('Error on updatePrice FE', error)
        })
        this.notifyPrice();
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

    notify = () => {
        toast('Added to cart!', { type: toast.TYPE.INFO, autoClose: 2000, pauseOnHover: true })
    }

    notifyDeleted = () => {
        toast('Product deleted', { type: toast.TYPE.ERROR, autoClose: 2000, pauseOnHover: true } )
    }

    notifyPrice = () => {
        toast('Price Updated', { type: toast.TYPE.INFO, autoClose: 2000, pauseOnHover: true })
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
                : <button onClick={() => this.addToCart(item.id, item.name, item.image_url, item.description, item.price)} >Add to Cart</button>
                }
                <br></br>
                {
                    loggedIn && user.user.admin 
                    ? <div>
                        <h1>Admin View</h1>
                        <button onClick={() => this.deleteProduct(item.id)} className="remove-product">Remove Product</button>
                        <p>Update Price: </p><input name='price' onChange={e => this.handleInputs(e)} className="update-price"></input>
                        <button onClick={() => this.updatePrice(this.state.price, item.id)}>Update</button>
                    </div>
                    : console.log('Is not admin')
                }
            </div>
        )
    })

    return (
    <div>
        <ToastContainer />

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