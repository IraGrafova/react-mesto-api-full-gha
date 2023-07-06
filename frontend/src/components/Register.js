import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Register({ handleRegister, handleError, handleSuccess }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = formValue;
    Auth.register({ email, password })
      .then(() => {
        handleRegister();
        handleSuccess();
        navigate("/sign-in");
      })
      .catch(() => {
        handleRegister();
        handleError();
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="authorization-form">
        <h2 className="authorization-form__title">Регистрация</h2>
        <input
          id="email"
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          className="authorization-form__input"
          placeholder="Email"
        ></input>
        <input
          id="password"
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          className="authorization-form__input"
          placeholder="Пароль"
        ></input>
        <button type="submit" className="authorization-form__submit">
          Зарегистрироваться
        </button>
        <NavLink to="/sign-in" className="authorization-form__sign-in">
          Уже зарегистрированы? Войти
        </NavLink>
      </form>
    </>
  );
}
export default Register;
