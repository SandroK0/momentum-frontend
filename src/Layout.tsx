import Header from './components/Header/Header'
import styles from "./Layout.module.css"


export default function Layout() {
  return (
    <div className={styles.layout}>
        <Header/>
    </div>
  )
}
