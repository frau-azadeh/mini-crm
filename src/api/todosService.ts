import { apiTodosClient } from "./apiTodosClient";

export type Todos = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

export async function fetchAllTodo(): Promise<Todos[]> {
    const response = await apiTodosClient.get<Todos[]>("/todos")
    return response.data
}