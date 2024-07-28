const serverURL = "https://nomoreparties.co/v1/wff-cohort-18/";
const token = "7558fb3a-dd96-490f-ac90-2d3731b65b8a";
export let userId;

export const setUserId = (id) => {
  userId = id;
};

export const fetchUserData = () => {
  return fetch(`${serverURL}users/me`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then(handleResponse)
    // .then((res) => {
    //   setUserId(res["_id"]);
    //   return res;
    // });
};

export const fetchCards = () => {
  return fetch(`${serverURL}cards`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

export const updateUserData = (name, about) => {
  return fetch(`${serverURL}users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

export const fetchAddСardToServer = (name, link) => {
  return fetch(`${serverURL}cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

export const fetchDeleteCardFromServer = (cardId) => {
  return fetch(`${serverURL}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

export const addLike = (cardId) => {
  return fetch(`${serverURL}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
  }).then(handleResponse);
};

export const removeLike = (cardId) => {
  return fetch(`${serverURL}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
  }).then(handleResponse);
};

export const updateAvatar = (url) => {
  return fetch(`${serverURL}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(handleResponse);
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};
