import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import {Link, NavLink,useNavigate } from "react-router-dom"
import { FaShoppingCart , FaTimes, FaUserCircle } from "react-icons/fa";
import { AiOutlineMenuFold } from "react-icons/ai";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../../firebase/config"
import {toast} from "react-toastify"
import {useDispatch, useSelector} from "react-redux"
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenlink/hiddenLink';
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice';


const logo=(
  <div className={styles.logo}>
          <Link to="/">
          <img src="https://luisant.in/wp-content/uploads/2024/09/Logo.png"></img>
          </Link>
        </div>

  )
  
  const activeLink =({isActive}) => (isActive ? `${styles.active}`: "")
const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setdisplayName] = useState("")
  const [scrollPage,setScrollPage]=useState(false)
  const cartTotalQuantity=useSelector(selectCartTotalQuantity)
 useEffect(()=>{
  dispatch(CALCULATE_TOTAL_QUANTITY())
 },[])
 const navigate = useNavigate()
 
 const dispatch = useDispatch()

const fixNavBar=()=>{
  if(window.scrollY>50){
    setScrollPage(true)
  }
}
window.addEventListener("scroll",fixNavBar)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log(user)
    if (user.displayName == null){
      const u1= user.email.substring(0, user.email.indexOf("@"))
      const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
      setdisplayName(uName)
    }else{
      setdisplayName(user.displayName) 
    }
    

    dispatch(SET_ACTIVE_USER({
      email:user.email,
      userName:user.displayName ? user.displayName :displayName ,
      userID: user.uid,
    }))
  } else {
    setdisplayName("")
    dispatch(REMOVE_ACTIVE_USER())
  }
});
 }, [dispatch, displayName])
  const toggleMenu =() =>{
    setShowMenu(!showMenu)
  }

  const hideMenu =() => {
    setShowMenu(false)
  }
  const logoutUser=()=>{
    signOut(auth).then(() => {
  toast.success("Logout Successfully")
  navigate("/")
}).catch((error) => {
  toast.error(error.message)
});

  }
  const cart =(
    <span className={
              styles.cart
            }>
              <Link to="/cart">
              Cart
              <FaShoppingCart size={20}/>
              <p>{cartTotalQuantity}</p>
              </Link>
            </span>
  )

  
  return (
    <header className={scrollPage?`${styles.fixed}`: null }>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>Contact Us</NavLink>
            </li>
            

          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
              <NavLink to="/adminLogin" className={activeLink}> Admin Login </NavLink></ShowOnLogout>
              <ShowOnLogout>
              <NavLink to="/login" className={activeLink}> Login </NavLink></ShowOnLogout>
            
              <ShowOnLogin>
              <a href="#home" style ={{color: "#2177ca"}}>
                <FaUserCircle size={16} />
                Hi, {displayName}
              </a>
              </ShowOnLogin>
              <ShowOnLogin>
              <NavLink to="/order-history" className={activeLink}> My Orders
              </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
              <NavLink to="/" onClick={logoutUser}> 
              LogOut
              </NavLink>
              </ShowOnLogin>

            </span>
            {cart}

          </div>
        
        </nav>
        
        
        <div className={styles["menu-icon"]}>
          {cart}
          <AiOutlineMenuFold size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
  )
}

export default Header
