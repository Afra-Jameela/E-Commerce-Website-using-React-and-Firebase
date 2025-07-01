import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <section>
    <div className='container'>
      <h1>Checkout Successful</h1>
      <p>
        Thank You for Your Purchase
      </p>
      <br/>
      
      <button className='--btn --btn-primary'><Link to="/order-history">View Order Status  </Link></button>
    
    </div>
    </section>
  )
}

export default CheckoutSuccess
