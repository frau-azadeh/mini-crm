"use client"

import React, { useEffect, useState } from "react";
import { Todos, fetchAllTodo } from "../../../api/todosService";

const AllTodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    fetchAllTodo().then(setTodos);
  }, []);

  return (
    <div className="space-y-4">
      {todos.map((t) => (
        <div key={t.id} className="p-4 border rounded shadow">
          <h3>{t.title}</h3>
          <p>UserID: {t.userId}</p>
          <p>{t.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
};

export default AllTodoList;
