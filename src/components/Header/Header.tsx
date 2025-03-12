import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import addIcon from "../../assets/add.svg";

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={logo}></img>
      <div className={styles.btnCont}>
        <button className={styles.createCoworkerBtn}>
          თანამშრომლის შექმნა
        </button>
        <button className={styles.createTaskBtn}>
          <img src={addIcon} />
          შექმენი ახალი დავალება
        </button>
      </div>
    </div>
  );
}
