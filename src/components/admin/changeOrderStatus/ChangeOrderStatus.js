import React, { useState } from 'react'
import styles from "./ChangeOrderStatus.module.scss"
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import { toast } from 'react-toastify'
import { collection, doc, or, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useNavigate } from 'react-router-dom'

const ChangeOrderStatus = ({order, id}) => {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState("")
  const navigate = useNavigate()
  const editOrder = async (e, id) => {
  e.preventDefault();
  setIsLoading(true);

  const orderConfig = {
    userID: order.userID,
    userEmail: order.userEmail,
    orderDate: order.orderDate,
    orderTime: order.orderTime,
    orderAmount: order.orderAmount,
    orderStatus: status,
    cartItems: order.cartItems,
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
    editedAt: Timestamp.now().toDate(),
  };

  try {
    await setDoc(doc(db, "orders", id), orderConfig);
    setIsLoading(false);
    toast.success("Order Status Changed Successfully");
    navigate("/admin/orders");
  } catch (error) {
    setIsLoading(false);
    toast.error(error.message);
  }
};

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                name=""
                id=""
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="" disabled>
                  --Choose One--
                </option>
                <option value="Order Placed">Order Placed</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button
                type="submit"
                className="--btn --btn-primary"
                disabled={!status}
              >
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
}

export default ChangeOrderStatus
