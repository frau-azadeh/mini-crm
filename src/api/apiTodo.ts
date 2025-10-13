import axios from "axios"

const API_BASE = "https://jsonplaceholder.typicode.com"
export const apiTodo = axios.create({
    baseURL: API_BASE,
    timeout: 1500,
    headers:{"Content-Type": "application/json"}
})

