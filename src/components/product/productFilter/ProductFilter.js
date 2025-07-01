import React, { useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import { useSelector,useDispatch } from 'react-redux'
import { selectProducts, selectMaxPrice,selectMinPrice } from '../../../redux/slice/productSlice'
import { FILTER_BY_CATEGORY,FILTER_BY_BRAND, FILTER_BY_PRICE} from '../../../redux/slice/filterSlice'
 

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(15000);
  const dispatch = useDispatch()
  const products =useSelector(selectProducts)
  const maxPrice  = useSelector(selectMaxPrice);
  const minPrice  = useSelector(selectMinPrice);
  const allCategories =[
    "All",
    ...new Set(products.map((product)=>product.category))
  ]
   const allBrands =[
    "All",
    ...new Set(products.map((product)=>product.brand))
  ]
  useEffect(()=>{
    dispatch(
      FILTER_BY_BRAND({products,brand})
    )

  },[dispatch, products, brand])

  useEffect(()=>{
    dispatch(
      FILTER_BY_PRICE({products,price})
    ) 

  },[dispatch, products, price])
  // console.log(allBrands);
  const filterProducts = (cat) => {
    setCategory(cat); 
    dispatch(
      FILTER_BY_CATEGORY({ products, category: cat })
    )

  }
  const clearFilter=()=>{
    setCategory("All")
    setBrand("All")
    setPrice(maxPrice)
  }
  
  return (
    <div className={styles.filter}>
      <h4>Category</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button key={index} type="button" 
            className={`${category === cat ? `${styles.active}` : null}`} onClick={() => filterProducts(cat)}>
           &#8250;{cat}
          </button>
          )
        })}
        <button className=''> All</button>
      </div>
        <h4>Brand</h4>
        <div className={styles.brand}>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="all">ALL</option>
            {allBrands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <h4>Price</h4>
          <p>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}</p>
          <div className={styles.price}>
            <input type="range" value={price} onChange={(e)=>{
              setPrice(e.target.value)
            }} min={minPrice} max={maxPrice}  />
          </div>

        <br/>
        
        <button className='--btn --btn-danger' onClick={clearFilter}>Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter
