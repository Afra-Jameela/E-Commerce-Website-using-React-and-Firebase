import React, { useEffect, useState } from 'react';
import styles from './OrderDetails.module.scss';
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import spinnerImg from '../../assests/spinner.jpg';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back to Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: '50px' }} />
        ) : (
          <>
            <p>
              <b>Order ID:</b> {order.id}
            </p>
            <p>
              <b>Order Amount:</b> ₹{order.orderAmount}
            </p>
            <p>
              <b>Order Status:</b> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const productId = cart.id;
                  const productName = cart.name;
                  const productPrice = cart.price;
                  const cartQuantity = cart.quantity;
                  const imageURL = cart.imageURL;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{productName}</b>
                        </p>
                        <img src={imageURL} alt={productName} style={{ width: '100px' }} />
                      </td>
                      <td>₹{productPrice}</td>
                      <td>{cartQuantity}</td>
                      <td>₹{(productPrice * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${productId}`}>
                          <button className="--btn --btn-primary">Review Product</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
