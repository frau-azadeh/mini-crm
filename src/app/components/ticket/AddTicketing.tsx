"use client";

import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Ticket } from "@/types/types";

import Button from "../ui/Button";

const AddTicketing: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [form, setForm] = useState<Omit<Ticket, "id">>({
    title: "",
    description: "",
  });

const handleChange = useCallback(
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.currentTarget.name as keyof Omit<Ticket, "id">;
    const value = e.currentTarget.value;
    setForm(prev => ({ ...prev, [name]: value }));
  },
  []
);


  

  const handleAdd = useCallback(() => {
    if (!form.title.trim()) return;
    const newTicketing: Ticket = {
      id: Date.now().toString(),
      ...form,
    };

    setTicket((prev) => [...prev, newTicketing]);
    setForm({
      title: "",
      description: "",
    });
  }, [form]);

  const countTicketing = useMemo(() => ticket.length, [ticket]);
  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        ایراد نرم افزاری خود را وارد کنید
      </h2>

      <div className="bg-white rounded-lg p-6 shadow-inner">
        <span className="block text-sm text-gray-600 mb-4">
          تعداد تیکت ثبت شده از سوی شما
          <span className="font-semibold text-slate-700">{countTicketing}</span>
        </span>
        <input
          name="title"
          value={form.title}
          placeholder="موضوع"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <textarea
          name="description"
          rows={4}
          cols={5}
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <Button onClick={handleAdd}>ذخیره</Button>
      </div>
    </div>
  );
};

export default AddTicketing;
