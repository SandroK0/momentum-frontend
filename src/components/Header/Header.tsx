import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import addIcon from "../../assets/add.svg";
import { useNavigate } from "react-router";
import { useState } from "react";
import CreateEmployee from "../CreateEmployeeModal/CreateEmployee";
import ReactDOM from "react-dom";

export default function Header() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={styles.header}>
        <img
          src={logo}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        ></img>
        <div className={styles.btnCont}>
          <button className={styles.createCoworkerBtn} onClick={() => setShowModal(true)}>
            თანამშრომლის შექმნა
          </button>
          <button
            className={styles.createTaskBtn}
            onClick={() => {
              navigate("/create-task");
            }}
          >
            <img src={addIcon} />
            შექმენი ახალი დავალება
          </button>
        </div>
      </div>
      {showModal &&
        ReactDOM.createPortal(
          <CreateEmployee closeModal={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
