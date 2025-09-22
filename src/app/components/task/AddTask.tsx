"use client";

import React, { useCallback, useState } from "react";

import { Task } from "../../../types/types";
import Button from "../ui/Button";
import ListTask from "./ListTask";

const AddTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(), // 👈 ساده‌ترین راه برای ساخت id یکتا
      text: inputValue,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  }, [inputValue]);

  return (
    <div>
      <h2 className="font-bold text-gray-800">تسک خود را اضافه کنید:</h2>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="تسک جدید ..."
        className="border rounded-md p-2 w-full"
      />
      <Button onClick={handleAddTask}>اضافه</Button>
      <ListTask tasks={tasks} />
    </div>
  );
};

export default AddTask;
