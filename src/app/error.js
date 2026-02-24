"use client";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles["error-container"]}>
      <h2 className={styles["error-title"]}>Algo deu errado</h2>
      <p className={styles["error-message"]}>
        {error?.message || "Ocorreu um erro inesperado."}
      </p>
      <button className={styles["error-button"]} onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
