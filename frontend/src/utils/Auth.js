export const baseUrl = "http://localhost:3000";
// https://api.mesto-grafs.nomoreparties.sbs";

export const register = (data) => {
  return fetch(`${baseUrl}/signup`, {
    credentials: 'include',
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data), //"password": "somepassword", "email": "email@yandex.ru"
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  });
};

export const login = (data) => {
  return fetch(`${baseUrl}/signin`, {
    credentials: 'include',
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data), //"password": "somepassword", "email": "email@yandex.ru"
  }).then((res) => {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  });
};

export const jwt = () => {

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "content-type": "application/json",
     // Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  });
  //# Если токен не передан или передан без Bearer
  // 400 — Токен не передан или передан не в том формате

  // # Если передан некорректный токен
  // 401 — Переданный токен некорректен
};
