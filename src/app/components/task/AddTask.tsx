"use client";

import React, { useCallback, useState } from "react";

import { Task } from "@/types/types";

import Button from "../ui/Button";
import ListTaskTable from "./ListTaskTable";

const AddTask = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  }, [inputValue]);

  const handleEdit = useCallback((id: Task["id"], newTask: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        String(t.id) === String(id) ? { ...t, text: newTask } : t,
      ),
    );
  }, []);

  const handleDelete = useCallback((id: Task["id"]) => {
    setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
  }, []);

  return (
    <div className="md:mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow rounded-xl p-6 md:p-8 mr-2 ml-2 mt-5">
      <h2 className="font-bold text-white text-md md:text-xl mb-6">
        تسک خود را اضافه کنید!
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
        <span className="block text-sm text-gray-600 mb-4">تسک جدید:</span>
        <input
          value={inputValue}
          onChange={handleChange}
          placeholder="تسک جدید ..."
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <div className="flex gap-2 items-center mb-4">
          <Button onClick={handleAddTask}>اضافه</Button>
        </div>
        <ListTaskTable
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddTask;
