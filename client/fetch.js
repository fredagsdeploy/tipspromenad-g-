const BASE_URL = "http://horv.se:9999";

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export const myfetch = (url, options = {}) => fetch(BASE_URL + url, options);

export const fetchJson = url =>
  myfetch(url).then(checkStatus).then(resp => resp.json());

export const fetchMe = userId =>
  myfetch("/me", {
    headers: {
      Authorization: userId
    }
  })
    .then(checkStatus)
    .then(resp => resp.json());

export const postJson = (url, data, userId) =>
  myfetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: userId
    },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(resp => resp.json());
