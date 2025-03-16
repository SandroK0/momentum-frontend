import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import styles from "./CreateTaskPage.module.css";

export default function CreateTaskPage() {
  return (
    <div className={styles.createTaskPage}>
      <h1>შექმენი ახალი დავალება</h1>
      <CreateTaskForm></CreateTaskForm>
    </div>
  );
}
