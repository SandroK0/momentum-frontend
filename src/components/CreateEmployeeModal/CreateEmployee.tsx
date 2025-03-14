import ModalWrapper from "../../utils/ModalWrapper";
import styles from "./CreateEmployee.module.css";
import cancelBtn from "../../assets/Cancel.svg";
import { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { getDepartments, postEmployee } from "../../api/api";
import { Department } from "../../Types";

interface CreateEmployeeProps {
  closeModal: () => void;
}

interface ValidationErrors {
  minLength: boolean;
  maxLength: boolean;
  invalidChars: boolean;
}

export default function CreateEmployee(props: CreateEmployeeProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [departmentsData, setDepartmentsData] = useState<Array<Department>>([]);
  const [name, setName] = useState<string>("");
  const [nameErrors, setNameErrors] = useState<ValidationErrors>({
    minLength: false,
    maxLength: false,
    invalidChars: false,
  });
  const [lastName, setLastName] = useState<string>("");
  const [lastNameErrors, setLastNameErrors] = useState<ValidationErrors>({
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

  const validate = (value: string): ValidationErrors => {
    if (!value) {
      return {
        minLength: false,
        maxLength: false,
        invalidChars: false,
      };
    }

    return {
      minLength: value.length < 2,
      maxLength: value.length > 255,
      invalidChars: !/^[a-zA-Zა-ჰ]+$/.test(value),
    };
  };

  const handleNameChange = (value: string) => {
    const errors = validate(value);
    setNameErrors(errors);
  };

  const handleLastNameChange = (value: string) => {
    const errors = validate(value);
    setLastNameErrors(errors);
  };

  const inputStyle = {
    error: { color: "red" },
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

  console.log(selectedImage);
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
              style={nameErrors.minLength ? inputStyle.error : {}}
            >
              მინიმუმ 2 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={nameErrors.maxLength ? inputStyle.error : {}}
            >
              მაქსუმუმ 255 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={nameErrors.invalidChars ? inputStyle.error : {}}
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
              style={lastNameErrors.minLength ? inputStyle.error : {}}
            >
              მინიმუმ 2 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={lastNameErrors.maxLength ? inputStyle.error : {}}
            >
              მაქსუმუმ 255 სიმბოლო
            </p>
            <p
              className={styles.reqField}
              style={lastNameErrors.invalidChars ? inputStyle.error : {}}
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
