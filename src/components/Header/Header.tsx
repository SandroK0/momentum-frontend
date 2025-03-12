import  logo from "../../assets/logo.svg"
import styles from "./Header.module.css" 


export default function Header() {
  return (
    <div className={styles.header}>
        <img src={logo}></img>
        <div className={styles.btnCont}>
          <button>თანამშრომლის შექმნა</button>
          <button>შექმნენით ახალი დავალება</button>
        </div>
    </div>
  )
}
