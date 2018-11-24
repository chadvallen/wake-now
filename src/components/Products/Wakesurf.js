import React, { Component } from 'react'
import '../../App';
import { Link } from 'react-router-dom';
import MyHOC from './MyHOC';

class Wakesurf extends Component {
    render() {
        let wakesurfList = this.props.data.map(item => {
            return (
            <div className="product-child" key={item.id}>
                <Link to={`/products/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
                    <img src={item.image_url} alt={item.title} className="product-img" />
                    <h5 className="name">{item.name}</h5>
                    <p className="price">${item.price}</p>
                </Link>
            </div>
            )
        })
        return (
            <div>
                <div className="product-parent">
                    {wakesurfList}
                </div>
            </div>
        )
    }
}

export default MyHOC(Wakesurf, '/api/products/wakesurf')