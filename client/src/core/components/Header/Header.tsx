import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import cn from "clsx";

import AuthService from "src/utils/AuthService";
import styles from "./Header.module.scss";
import Button, { ButtonType } from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "src/features/Auth/ducks";
import { getIsError } from "src/features/Auth/ducks/selectors";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getIsError);

  useEffect(() => {
    if (error) {
      alert("Произошла ошибка");
    }
  }, [error]);

  const handleLogout = useCallback(() => {
    try {
      dispatch(actions.fetchLogout());
      navigate("/login");
    } catch (e) {
      throw new Error(e as string);
    }
  }, [dispatch, navigate]);

  const buttons = AuthService.hasToken() ? (
    <div className={cn(styles.wrapper_button, styles.exit)}>
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
