import axios from "axios"

const API_BASE = "https://jsonplaceholder.typicode.com"

export const apiTodosClient = axios.create({
    baseURL: API_BASE,
    timeout: 15000,
    headers: {
        "Content-Type" : "application/json"
    }
})