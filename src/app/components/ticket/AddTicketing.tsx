"use client";

import React, { ChangeEvent, useCallback, useState } from "react";

import { Ticket } from "@/types/types";

import Button from "../ui/Button";
import ListTicketing from "./ListTicketing";
import { useTicketingStorage } from "./hook/useTicketingStorage";

const AddTicketing: React.FC = () => {
  const { ticketing,addTicketing, editTicketing, deleteTicketing } = useTicketingStorage();
  const [form, setForm] = useState<Omit<Ticket, "id">>({
    title: "",
    description: "",
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.currentTarget.name as keyof Omit<Ticket, "id">;
      const value = e.currentTarget.value;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleAdd = useCallback(() => {
    if (!form.title.trim()) return;
addTicketing({id: Date.now().toString(), ...form})
    setForm({
      title: "",
      description: "",
    });
  }, [form]);

  return (
    <div className="md:mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow rounded-xl p-6 md:p-8 mr-2 ml-2 mt-5">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        ایراد نرم افزاری خود را وارد کنید
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
        <input
          onChange={handleChange}
          name="title"
          value={form.title}
          placeholder="موضوع"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="شرح"
          rows={4}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <Button onClick={handleAdd}>ذخیره</Button>
      </div>
      <ListTicketing
        tickets={ticketing}
        onDelete={deleteTicketing}
        onEdit={editTicketing}
      />
    </div>
  );
};

export default AddTicketing;
