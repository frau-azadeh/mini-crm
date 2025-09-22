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
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        تسک خود را اضافه کنید:
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner">
        <input
          value={inputValue}
          onChange={handleChange}
          placeholder="تسک جدید ..."
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <Button onClick={handleAddTask}>اضافه</Button>
        <ListTask tasks={tasks} />
      </div>
    </div>
  );
};

export default AddTask;
