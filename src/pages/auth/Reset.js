import styles from "./auth.module.scss"
import {Link} from "react-router-dom"
import Card from "../../components/card/Card"
import resetImg from "../../assests/forgot.png"
import { useState } from "react"
import { FaTruckLoading } from "react-icons/fa"
import { toast } from "react-toastify"
import { auth } from "../../firebase/config"
import { sendPasswordResetEmail } from "firebase/auth"
import Loader from "../../components/loader/Loader"

const Reset = () => {
  const [email,setEmail] = useState("")
  const [isloading,setIsLoading]= useState(false)
 const resetPassword=(e)=>{
  e.preventDefault()
  setIsLoading(true)
  sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success("Check Your email")
    
    
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });
  
 }
  return (
    <>
    {isloading && <Loader/>}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg } alt="Reset Password" width="400" />
        </div>
        <Card>
        <div className= {styles.form}>
          <h2>Reset Password</h2> 
          <form onSubmit={resetPassword}>
            <input type="text" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
            <div className={styles.link}>
                <p>
                <Link to="/login">Login</Link>
                </p>
                <p>
                <Link to="/register">Register</Link>
                </p>
            </div>
          </form>
        </div>
        </Card>
    </section>
    </>
  )
}

export default Reset
