import Image from "next/image";
import styles from "./Avatar.module.css";

const Avatar = ({ name, imageSrc }) => {
  return (
    <ul className={styles["avatar-list"]}>
      {imageSrc && (
        <li className={styles["avatar-item"]}>
          <Image
            src={imageSrc}
            width={32}
            height={32}
            alt={`Avatar do(a) ${name}`}
          />
        </li>
      )}
      <li className={styles["avatar-name"]}>{name}</li>
    </ul>
  );
};

export default Avatar;
