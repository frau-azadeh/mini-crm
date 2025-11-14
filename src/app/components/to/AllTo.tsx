"use client";

import React, { useEffect, useState } from "react";

import { Todo, fetchTodo } from "@/api/todoService";

const AllTo: React.FC = () => {
  const [todo, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodo().then(setTodos);
  }, []);

  return (
    <div className="space-y-4">
      {todo.map((t) => (
        <div key={t.id} className="p-4 border rounded shadow">
          <h3>{t.title}</h3>
          <p>{t.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default AllTo;
