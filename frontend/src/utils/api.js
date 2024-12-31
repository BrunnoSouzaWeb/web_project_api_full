class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _getAuthorizationHeaders() {
    return {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }

  /*
  _updateHeaders(token) {
    if (token) {
      this._headers.Authorization = `Bearer ${token}`;
    }
  }

  setToken(token) {
    this._updateHeaders(token); // Atualiza os cabeçalhos dinamicamente
  }
    */

  getUserInfo() {
    console.log("getinfo", this._headers);
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getAuthorizationHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getAuthorizationHeaders(),
    })
      .then((res) => {
        console.log("resposta card", res);
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }
    */

  updateEditPerfil(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getAuthorizationHeaders(),
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getAuthorizationHeaders(),
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getAuthorizationHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._getAuthorizationHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._getAuthorizationHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getAuthorizationHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getAuthorizationHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const api = new Api({
  //baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  baseUrl: "http://localhost:3000",
  headers: {
    //authorization: "1f012d49-8fd6-43fa-aeaf-50158ed3cf4a",
    //authorization:
    //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZlMjM5ZmVlZDY2NTk0MWYxODRmNTQiLCJpYXQiOjE3MzUyNzE0NzUsImV4cCI6MTczNTg3NjI3NX0.0QFMWubrtg7NxLwB-vDFCdBm_8qSATW5zxDG__O_KKE",
    ///  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
