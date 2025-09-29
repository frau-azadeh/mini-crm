import { Task } from "@/types/types"
import { useState } from "react"

const STORAGE_KEY = "my_app_task"

export function useTaskStorage(){

    const [tasks, setTask] = useState<Task[]>([])
    return
}