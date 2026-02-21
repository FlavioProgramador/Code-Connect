import React from "react";
import logo from "./logo-code-connect.png";
import Image from "next/image";
import styles from "./Aside.module.css";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Image src={logo} alt="Logo Code Connect" className={styles.logo} />
    </aside>
  );
};

export default Aside;
