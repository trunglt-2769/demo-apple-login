import React from "react";
import styles from "./styles.module.css";

const Button = ({ children, color, ...rest }) => {
  return (
    <button className={`${styles.btn} ${color === "gray" ? styles.btnGray : ""}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
