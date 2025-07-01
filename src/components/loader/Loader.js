import ReactDom from "react-dom"
 import styles from "./Loader.module.scss"
 import LoaderImg from "../../assests/loader.gif"
const Loader = () => {
  return  ReactDom.createPortal(
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={LoaderImg} alt='loading...'></img>
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader
