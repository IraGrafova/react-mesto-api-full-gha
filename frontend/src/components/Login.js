import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Login({ handleLogin }) {
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

    const { email, password } = formValue; // то же самое что formValue.email И formValue.password писать в следующей строке, просто упростили запись, вытащив переменные
    Auth.login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin(email);
          navigate("/");
        }
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="authorization">
      <form onSubmit={handleSubmit} className="authorization-form">
        <h2 className="authorization-form__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
