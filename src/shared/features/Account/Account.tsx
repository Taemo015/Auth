import React from "react";
import { Link } from "react-router-dom";
import styles from "./Account.module.css";

const Account: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Главная страница</h1>
      <Link to="/">На главную</Link>
    </div>
  );
};

export default Account;
