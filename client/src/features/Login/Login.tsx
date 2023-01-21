import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button, { ButtonType } from "src/components/Button";
import Input from "src/components/Input";
import Form from "src/core/layout/Form";
import { actions } from "src/features/Auth/ducks";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const dispatch = useDispatch();

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
