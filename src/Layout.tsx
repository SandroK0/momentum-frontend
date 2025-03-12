import { Outlet } from 'react-router'
import Header from './components/Header/Header'
import styles from "./Layout.module.css"


export default function Layout() {
  return (
    <div className={styles.layout}>
        <Header/>
        <Outlet></Outlet>
    </div>
  )
}
