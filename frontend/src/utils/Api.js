class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  saveCard(data) {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //если карточка не лайкнута то => лайк, иначе убери
  putLike(idCard, isLiked) {
    if(!isLiked) {
      return fetch(`${this._url}/cards/${idCard}/likes`, {
        credentials: 'include',
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  } else {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
    }

}

const api = new Api({
  url: "https://api.mesto-grafs.nomoreparties.sbs",
  headers: {
    "content-type": "application/json",
//   authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
