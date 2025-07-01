import React, { useEffect } from 'react'
import styles from "./OrderHistory.module.scss"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { selectOrderHistory, STORE_ORDERS } from '../../redux/slice/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserID } from '../../redux/slice/authSlice'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'


const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const orders = useSelector(selectOrderHistory)
  const userID = useSelector(selectUserID)
  const dispatch = useDispatch()
  const navigate= useNavigate()

  useEffect(()=>{
    //  const userOrders = data.filter(order => order.userID === userID);
  dispatch(STORE_ORDERS(data))
    
  }, [dispatch, data,userID])

  const handleClick =(id) =>{
    navigate(`/order-details/${id}`)
  }
  const filterOrders = orders.filter((order)=>order.userID===userID)

  return (
    <section>
    <div className={`container ${styles.order}`}>
      <h2>Your Order History</h2>
      <p>Open an order to leave a <b>Product Review</b></p>
      <br />
      <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        {filterOrders.length === 0 ?(
          <p>No order found </p>
        ): (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Order Amount</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {filterOrders.map((order, index) =>{
                const {id, orderDate, orderTime, orderAmount, orderStatus} = order
                return(
                  <tr key={id} onClick={() =>handleClick(id)}>
                    <td>{index +1}</td>
                    <td>{orderDate} at {orderTime}</td>
                    <td>{id}</td>
                    <td>{"₹"}{orderAmount}</td>
                    <td>
                      <p className={orderStatus !== "Delivered" ? `${styles.pending}`: `${styles.delivered}`}>{orderStatus}</p>
                    </td>

                  </tr>

                )
              })}
            </tbody>
          </table>
        )}
      </div>
      </>
    </div>
    </section>
  )
}

export default OrderHistory
