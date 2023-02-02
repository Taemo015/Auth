import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";

import Input from "shared/components/Input";
import Form from "shared/core/layout/Form";
import Button, { ButtonType } from "shared/components/Button";
import styles from "./Registration.module.scss";
import { actions } from "shared/features/Auth/ducks";

const Registration: React.FC = () => {
  const [emailValue, setEmailValue] = useState<string>("t.tomaev@yandex.ru");
  const [nicknameValue, setNickNameValue] = useState<string>("Tamo_015");
  const [passwordValue, setPasswordValue] = useState<string>("123123");
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("nickname", nicknameValue);
      formData.append("password", passwordValue);
      dispatch(actions.fetchRegistration(formData));
    },
    [dispatch, emailValue, nicknameValue, passwordValue]
  );

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickNameValue(e.target.value);
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
          onChange={handleChangeName}
          placeholder="nickname"
          value={nicknameValue}
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

export default Registration;
