import React, { useEffect } from 'react'
import styles from "./Cart.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CLEAR_CART, DECREASE_CART,CALCULATE_TOTAL_QUANTITY, REMOVE_FROM_CART, selectCartItems, selectCartTotalAmount , selectCartTotalQuantity, SAVE_URL} from '../../redux/slice/cartSlice'
import { FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity= useSelector(selectCartTotalQuantity)
  const dispatch = useDispatch()
  const isLoggedIn= useSelector(selectIsLoggedIn)
  const navigate=useNavigate()
  const increaseCart=(cart)=>{
    dispatch(ADD_TO_CART(cart))

  }
  const decreaseCart=(cart)=>{
    dispatch(DECREASE_CART(cart))

  }
  const removeFromCart=(cart)=>{
    dispatch(REMOVE_FROM_CART(cart))
  }
  const clearCart=()=>{
    dispatch(CLEAR_CART())
  }
  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(SAVE_URL(""))
  },[dispatch,cartItems])
  const url = window.location.href
  const checkout=()=>{
    if (isLoggedIn){
      navigate("/checkout-details")
    }else{
      dispatch(SAVE_URL(url))
      navigate("/login")
    }
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your Cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qunatity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        ></img>
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => {
                              decreaseCart(cart);
                            }}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => {
                              increaseCart(cart);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                {" "}
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#product">&larr; Continue Shopping</Link>
                  <br />
                  <Card cardClass={styles.card}>
                    <p>
                      <strong>{`Cart item(s):${cartTotalQuantity}`}</strong>
                    </p>
                    <div className={styles.text}>
                      <h4>Subtotal:</h4>
                      <h3>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(cartTotalAmount)}
                      </h3>
                    </div>
                    <p>Tax and shipping calculated at checkout </p>
                    <button
                      className="--btn --btn-primary --btn-block"
                      onClick={checkout}
                    >
                      Checkout
                    </button>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart
