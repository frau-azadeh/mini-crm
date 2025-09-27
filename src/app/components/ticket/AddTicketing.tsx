"use client";

import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Ticket } from "@/types/types";

import Button from "../ui/Button";
import ListTicketing from "./ListTicketing";

const AddTicketing: React.FC = () => {
  // لیست تیکت‌ها
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // فرم ثبت (بدون id)
  const [form, setForm] = useState<Omit<Ticket, "id">>({
    title: "",
    description: "",
  });

  // هندل تغییر برای input و textarea
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.currentTarget.name as keyof Omit<Ticket, "id">;
      const value = e.currentTarget.value;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  // اضافه کردن تیکت جدید
  const handleAdd = useCallback(() => {
    if (!form.title.trim()) return;
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
    };

    setTickets((prev) => [...prev, newTicket]);

    // پاک کردن فرم
    setForm({
      title: "",
      description: "",
    });
  }, [form]);

  // ویرایش عنوان (onEdit که به ListTicketing پاس داده می‌شود)
  // این مثال فقط عنوان را ویرایش می‌کند (newTitle)
  // ویرایش کامل تیکت (title و description)
  const handleEdit = useCallback(
    (id: Ticket["id"], newData: Omit<Ticket, "id">) => {
      setTickets((prev) =>
        prev.map((t) =>
          String(t.id) === String(id) ? { ...t, ...newData } : t,
        ),
      );
    },
    [],
  );

  // حذف تیکت
  const handleDelete = useCallback((id: Ticket["id"]) => {
    setTickets((prev) => prev.filter((t) => String(t.id) !== String(id)));
  }, []);

  const countTicketing = useMemo(() => tickets.length, [tickets]);

  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        ایراد نرم افزاری خود را وارد کنید
      </h2>

      <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
        <span className="block text-sm text-gray-600 mb-4">
          تعداد تیکت ثبت شده از سوی شما:
          <span className="font-semibold text-slate-700 ml-2">
            {countTicketing}
          </span>
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
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          placeholder="شرح مشکل (اختیاری)"
        />

        <Button onClick={handleAdd}>ذخیره</Button>
      </div>

      <ListTicketing
        tickets={tickets}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AddTicketing;
