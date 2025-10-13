import axios from "axios";
import { apiTodo } from "./apiTodo";

export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export async function fetchTodo(): Promise<Todo[]> {
    const response = await apiTodo.get<Todo[]>("/comment")
    return response.data
}
