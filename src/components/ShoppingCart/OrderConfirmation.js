import React from 'react'
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div>
      <h1>Order placed!</h1>
      <Link to='/orders' ><button>View orders</button></Link>
    </div>
  )
}
