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
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  saveCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
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
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });

    }

}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    "content-type": "application/json",
    authorization: "e31129f1-5493-4dd7-bb19-51cc3d3b29e6",
  },
});

export default api;
