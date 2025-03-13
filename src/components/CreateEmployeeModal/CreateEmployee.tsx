import ModalWrapper from "../../utils/ModalWrapper";
import styles from "./CreateEmployee.module.css";
import cancelBtn from "../../assets/Cancel.svg";
import { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { getDepartments } from "../../api/api";
import { Department } from "../../Types";

interface CreateEmployeeProps {
  closeModal: () => void;
}

export default function CreateEmployee(props: CreateEmployeeProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [departments, setDepartments] = useState<Array<Department>>([]);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  async function getDepartmentsData() {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDepartmentsData();
  }, []);

  return (
    <ModalWrapper closeModal={props.closeModal}>
      <div className={styles.cont}>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            cursor: "pointer",
          }}
        >
          <img src={cancelBtn} onClick={props.closeModal} />
        </div>
        <h2>თანამშრომლის დამატება</h2>
        <div className={styles.inputsCont}>
          <div className={styles.nameInput}>
            <label htmlFor="saxeli">სახელი*</label>
            <input
              type="text"
              id="saxeli"
              name="სახელი"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className={styles.reqField}>მინიმუმ 2 სიმბოლო</p>
            <p className={styles.reqField}>მაქსუმუმ 255 სიმბოლო</p>
          </div>
          <div className={styles.nameInput}>
            <label htmlFor="gvari">გვარი*</label>
            <input
              type="text"
              id="gvari"
              name="გვარი"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <p className={styles.reqField}>მინიმუმ 2 სიმბოლო</p>
            <p className={styles.reqField}>მაქსუმუმ 255 სიმბოლო</p>
          </div>
        </div>
        <div className={styles.imgInputCont}>
          <ImageUploader onImageSelect={setSelectedImage} />
        </div>
        <div className={styles.depInput}>
          <label htmlFor="">დეპარტამენტი*</label>
          <select>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.btnCont}>
          <button onClick={props.closeModal}>გაუქმება</button>
          <button>დაამატე თანამრომელი</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
