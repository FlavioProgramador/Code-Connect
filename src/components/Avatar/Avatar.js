import Image from "next/image";
import styles from "./Avatar.module.css";

const Avatar = ({ name, imageSrc }) => {
  return (
    <div className={styles.avatar}>
      {imageSrc && (
        <Image
          src={imageSrc}
          width={32}
          height={32}
          alt={`Avatar do(a) ${name}`}
          className={styles.avatarImage}
        />
      )}
      <span className={styles.avatarName}>@{name}</span>
    </div>
  );
};

export default Avatar;