import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button, { ButtonType } from "src/components/Button";
import Input from "src/components/Input";
import Form from "src/core/layout/Form";
import { actions } from "src/features/Auth/ducks";
import { getIsError, getUser } from "src/features/Auth/ducks/selectors";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const user = useSelector(getUser);
  const error = useSelector(getIsError);
  const [emailValue, setEmailValue] = useState<string>("t.tomaev@yandex.ru");
  const [passwordValue, setPasswordValue] = useState<string>("123123123");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert("Произошла ошибка");
    }
  }, [error, user]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("password", passwordValue);

      dispatch(actions.fetchLogin(formData));
    },
    [dispatch]
  );

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Input
          onChange={handleChangeEmail}
          placeholder="email"
          type="email"
          value={emailValue}
          variant="input"
          className={styles.form_input}
        />
        <Input
          value={passwordValue}
          onChange={handleChangePass}
          placeholder="password"
          type="password"
          variant="input"
          className={styles.form_input}
        />
        <Button className={styles.form_button} type={ButtonType.submit}>
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default Login;
