import { useCallback, useEffect, useState } from "react";

import { json } from "stream/consumers";

import { Task } from "@/types/types";

const STORAGE_KEY = "my_app_task";

export function useTaskStorage() {
  const [tasks, setTask] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Task[] | null;
      if (Array.isArray(parsed)) setTask(parsed);
    } catch (error) {
      console.error("خطا در خواندن از  localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("خطا در نوشتن در localStorage", error);
    }
  }, [tasks]);

  const addTask = useCallback((newTask: Task) => {
    setTask((prev) => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback(
    (id: Task["id"]) => {
      setTask((prev) => prev.filter((t) => String(t.id) !== String(id)));
    },
    [],
  );

  const editTask = useCallback((id: Task["id"], newText: string) => {
    setTask((prev) =>
      prev.map((t) =>
        String(t.id) === String(id)
          ? {
              ...t,
              text: newText,
            }
          : t,
      ),
    );
  }, []);

  return { tasks, addTask, deleteTask, editTask };
}
