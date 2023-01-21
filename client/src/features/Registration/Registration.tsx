import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "src/components/Input";
import Form from "src/core/layout/Form";
import Button, { ButtonType } from "src/components/Button";
import styles from "./Registration.module.scss";
import { getIsError, getUser } from "src/features/Auth/ducks/selectors";
import { actions } from "src/features/Auth/ducks";

const Registration: React.FC = () => {
  const user = useSelector(getUser);
  const error = useSelector(getIsError);
  const [emailValue, setEmailValue] = useState<string>("");
  const [nicknameValue, setNickNameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error, user]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("nickname", nicknameValue);
      formData.append("password", passwordValue);

      dispatch(actions.fetchRegistration(formData));
    },
    [dispatch]
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
