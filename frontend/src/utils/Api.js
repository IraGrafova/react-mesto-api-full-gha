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
      method: "GET",
      headers: {
        "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  saveCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
       "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
      "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //если карточка не лайкнута то => лайк, иначе убери
  putLike(idCard, isLiked) {
    if(!isLiked) {
      return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  } else {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
    }

}

const api = new Api({
  url: "http://localhost:3000",  // https://mesto.nomoreparties.co/v1/cohort-62
});

export default api;
