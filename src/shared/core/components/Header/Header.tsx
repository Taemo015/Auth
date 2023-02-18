import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cn from "clsx";

import AuthService from "shared/utils/AuthService";
import Button, { ButtonType } from "shared/components/Button";
import { actions } from "shared/features/Auth/ducks";
import { getIsError, getUser } from "shared/features/Auth/ducks/selectors";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const user = useSelector(getUser);
  const error = useSelector(getIsError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (!error && user) {
      navigate("/");
    }
  }, [error, user]);

  const handleLogout = useCallback(() => {
    try {
      // dispatch(actions.fetchLogout());
      // navigate("/login");
    } catch (e) {
      throw new Error(e as string);
    }
  }, [dispatch, navigate]);

  const buttons = AuthService.hasToken() ? (
    <div className={cn(styles.wrapper_button, styles.exit)}>
      <h2 className={styles.nickname}>{user?.nickname}</h2>
      <Button type={ButtonType.submit} onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  ) : (
    <>
      <div className={cn(styles.wrapper_button, styles.enter)}>
        <Link to="/login">Войти</Link>
      </div>
      <div className={cn(styles.wrapper_button, styles.registration)}>
        <Link to="/registration">Регистрация</Link>
      </div>
    </>
  );

  return <div className={styles.wrapper}>{buttons}</div>;
};

export default Header;
