import axios from "axios";

const API_COMMENT = "https://jsonplaceholder.typicode.com/";

export const apiCommentClient = axios.create({
  baseURL: API_COMMENT,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
