import React, { useEffect, useState } from 'react'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import styles from './Product.module.scss'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS,selectProducts,GET_PRICE_RANGE } from '../../redux/slice/productSlice'
import Loader from '../loader/Loader'
import spinnerImg from '../../assests/spinner.jpg'
import { FaCogs } from 'react-icons/fa'
const Product = () => {
   const {data, isLoading}= useFetchCollection("products")
  const products= useSelector(selectProducts)
  const [showFilter, setShowFilter]=useState(false)
  // console.log(products);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(GET_PRICE_RANGE({
      products:data,
    }));
  }, [dispatch, data]);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <section>
        <div className={`container ${styles.product}`}>
          <aside className={`${styles.filter} ${showFilter ? styles.show : ""}`}>

             {isLoading ? null:(<ProductFilter/>)}
          </aside>
          <div className={styles.content}>
            {isLoading ? (<img src={spinnerImg} alt="Loading..." style={{width:"50px",padding: "10px 0px"}} className='--center-all'></img>):(<ProductList products={products} />)}
            <div className={styles.icon} onClick={toggleFilter}>
              <FaCogs size={20 } color="#2176b7"></FaCogs>
              <p>
                <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
              </p>
            </div>
            
          </div>
        </div>
    </section>
  )
}

export default Product
