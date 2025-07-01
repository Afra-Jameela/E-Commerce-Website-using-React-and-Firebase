import React, { useEffect } from 'react';
import styles from "./Home.module.scss";
import InfoBox from '../../infoBox/InfoBox';
import {selectProducts, STORE_PRODUCTS} from"../../../redux/slice/productSlice";
import {CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS} from "../../../redux/slice/orderSlice"
import { FaRupeeSign, FaShoppingCart, FaCartArrowDown } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux"
import  useFetchCollection from "../../../customHooks/useFetchCollection"

import Charts from '../../Charts/Charts';

const earningIcon = <FaRupeeSign size={30} color="#b624ff" />;
const productIcon = <FaShoppingCart size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  const totalOrderAmount = useSelector(selectTotalOrderAmount)
  const fbProducts = useFetchCollection("products")
  const {data}= useFetchCollection("orders")
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({
      products: fbProducts.data
    }))
    dispatch(STORE_ORDERS(data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT({
      amount: data,
    }))
  },[dispatch,data,fbProducts])
  
  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`₹${totalOrderAmount}`}
          icons={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icons={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icons={ordersIcon}
        />
      </div>
      <div>
        <Charts/>
      </div>
    </div>
  );
};

export default Home;
