import { useEffect } from 'react'
import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute'
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'
// import styles from "./Home.module.scss"
const Home = () => {
  const url= window.location.href
  
  useEffect(()=>{
    const scrollToProducts=()=>{
    if(url.includes("#products")){
      window.scrollTo({
        top:700,
        behavior:"smooth"
      })
      return 
    }
  }
    scrollToProducts();
  },[url])
  return (
    <div>
      <Slider />
      <Product/>
      
    </div>
  )
}

export default Home
