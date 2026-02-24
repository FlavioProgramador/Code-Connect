import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-spinner"]} />
      <p className={styles["loading-text"]}>Carregando posts...</p>
    </div>
  );
}
