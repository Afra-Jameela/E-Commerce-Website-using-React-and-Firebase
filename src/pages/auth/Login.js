
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import styles from './auth.module.scss';
import loginImg from '../../assests/login.png';
import {FaGoogle} from "react-icons/fa"
import {Link,useNavigate} from "react-router-dom"
import Card from "../../components/card/Card"
import {  useState } from 'react';
import {auth} from "../../firebase/config"
import {toast} from "react-toastify"
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword] = useState("")
  const [isloading,setIsLoading] = useState(false)
  
  const previousURL = useSelector(selectPreviousURL)
  const navigate = useNavigate()
  const redirectUser =()=>{
    if(previousURL.includes("cart"))
    {
      return navigate("/cart")
    }
    navigate("/")
  }
  
   const loginUser =(e)=>{
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setIsLoading(false)
    toast.success("Login Successful...")
    redirectUser()

    // ...
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });

  
   }
    const provider = new GoogleAuthProvider();
    const signInWithGoogle=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    toast.success("Login Successfully")
    redirectUser()
    
  }).catch((error) => {
    toast.error(error.message)

    
  });
    }

  return (
  <>
  {isloading && <Loader/>}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card cardClass={styles.cardAlt}>
        <div className= {styles.form}>
          <h2>Login</h2>
          
          <form onSubmit={loginUser}>
            <input type="text" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
            <div className={styles.links}>
                <Link to= "/reset">Reset Password</Link>
            </div>
            <p>---or---</p>
          </form>
          <button className='--btn --btn-danger --btn-block ' onClick={signInWithGoogle}><FaGoogle  className="icon"color="#fff"/>Login with Google</button>
          <span className={styles.register}>
            <p>Don't have an account? </p>
            <Link to ="/register">Register</Link>
          </span>
        </div>
        </Card>
    </section>
    </>
  );
};

export default Login;
