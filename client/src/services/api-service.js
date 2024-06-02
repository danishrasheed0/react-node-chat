import axios from "axios";
import { BASE_URL } from "../../env.js";
console.log(BASE_URL,'BASE_URL')
const HTTP = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  },
  timeout: 7000,
});

export function get(url = "") {
  addToken();
  return HTTP.get(`${BASE_URL}/${url}`);
}

export function post(url, data) {
  addToken();
  return HTTP.post(`${BASE_URL}/${url}`, data);
}

export function put(url, data, id) {
  addToken();
  return HTTP.put(`${BASE_URL}/${url}/${id}`, data);
}

export function del(url, id) {
  addToken();
  return HTTP.delete(`${BASE_URL}/${url}/${id}`);
}

function addToken() {
  HTTP.defaults.headers.common.bearer = "Access Token";
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
}
