import ModalWrapper from "../../utils/ModalWrapper";
import styles from "./CreateEmployee.module.css";
import cancelBtn from "../../assets/Cancel.svg";
import { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { getDepartments, postEmployee } from "../../api/api";
import { Department } from "../../Types";
import {
  NameValidationErrors,
  validateName,
} from "../../utils/validationUtils";

interface CreateEmployeeProps {
  closeModal: () => void;
}

export default function CreateEmployee(props: CreateEmployeeProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [departmentsData, setDepartmentsData] = useState<Array<Department>>([]);
  const [name, setName] = useState<string>("");
  const [nameErrors, setNameErrors] = useState<NameValidationErrors>({
    minLength: false,
    maxLength: false,
    invalidChars: false,
  });
  const [lastName, setLastName] = useState<string>("");
  const [lastNameErrors, setLastNameErrors] = useState<NameValidationErrors>({
    minLength: false,
    maxLength: false,
    invalidChars: false,
  });
  const [department, setDepartment] = useState<number>(-1);

  async function getDepartmentsData() {
    try {
      const data = await getDepartments();
      setDepartmentsData(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDepartmentsData();
  }, []);

  const handleNameChange = (value: string) => {
    const errors = validateName(value);
    setNameErrors(errors);
  };

  const handleLastNameChange = (value: string) => {
    const errors = validateName(value);
    setLastNameErrors(errors);
  };


  const validColors = {
    error: {
      color: "red",
    },
    correct: {
      color: "#08A508"
    }
  };



  const isDisabled = (): boolean => {
    if (!selectedImage) {
      return true;
    }

    if (
      nameErrors.maxLength ||
      nameErrors.minLength ||
      nameErrors.invalidChars
    ) {
      return true;
    }

    if (
      lastNameErrors.maxLength ||
      lastNameErrors.minLength ||
      lastNameErrors.invalidChars
    ) {
      return true;
    }

    if (department === -1 || !name || !lastName) {
      return true;
    }

    return false;
  };

  async function createEmployee() {
    try {
      await postEmployee(name, lastName, selectedImage as File, department);

      props.closeModal();
    } catch (err: any) {
      console.log("Error creating Employee", err.message);
    }
  }

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
            <label htmlFor="saxeli" className={styles.label}>
              სახელი*
            </label>
            <input
              type="text"
              id="saxeli"
              name="სახელი"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleNameChange(e.target.value);
              }}
            />
            <p
              className={styles.reqField}
              style={name ? !nameErrors.minLength ? validColors.correct : validColors.error : {}}
            >
              მინიმუმ 2 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={name ? !nameErrors.maxLength ? validColors.correct : validColors.error : {}}
            >
              მაქსუმუმ 255 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={name ? !nameErrors.invalidChars ? validColors.correct : validColors.error : {}}
            >
              მარტო ლათინური და ქართული სიმბოლოები
            </p>
          </div>
          <div className={styles.nameInput}>
            <label htmlFor="gvari" className={styles.label}>
              გვარი*
            </label>
            <input
              type="text"
              id="gvari"
              name="გვარი"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleLastNameChange(e.target.value);
              }}
            />
            <p
              className={styles.reqField}
              style={lastName ? !lastNameErrors.minLength ? validColors.correct : validColors.error : {}}
            >
              მინიმუმ 2 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={lastName ? !lastNameErrors.maxLength ? validColors.correct : validColors.error : {}}
            >
              მაქსუმუმ 255 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={lastName ? !lastNameErrors.invalidChars ? validColors.correct : validColors.error : {}}
            >
              მარტო ლათინური და ქართული სიმბოლოები
            </p>
          </div>
        </div>
        <div className={styles.imgInputCont}>
          <label className={styles.label}>ავატარი*</label>
          <ImageUploader onImageSelect={setSelectedImage} />
        </div>
        <div className={styles.depInput}>
          <label htmlFor="">დეპარტამენტი*</label>
          <select
            value={department}
            onChange={(e) => setDepartment(Number(e.target.value))}
          >
            <option value={-1} disabled selected>
              აირჩიეთ დეპარტამენტი
            </option>
            {departmentsData.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.btnCont}>
          <button onClick={props.closeModal}>გაუქმება</button>
          <button disabled={isDisabled()} onClick={createEmployee}>
            დაამატე თანამშრომელი
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
