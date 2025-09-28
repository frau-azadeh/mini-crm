"use client";

import React, { useCallback, useState } from "react";

import { Lead } from "@/types/types";

import Button from "../ui/Button";
import ListLead from "./ListLead";

const AddLead: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<Omit<Lead, "id">>({
    name: "",
    family: "",
    phone: "",
    address: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAdd = useCallback(() => {
    if (!form.name.trim()) return;

    const newLead: Lead = {
      id: Date.now().toString(),
      ...form,
    };
    setLeads((prev) => [...prev, newLead]);
    setForm({
      name: "",
      family: "",
      phone: "",
      address: "",
    });
  }, [form]);

  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        سرنخ ها را وارد کنید
      </h2>

      <div className="bg-white rounded-lg p-6 shadow-inner">
        <input
          onChange={handleChange}
          name="name"
          value={form.name}
          placeholder="نام"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <input
          onChange={handleChange}
          name="family"
          value={form.family}
          placeholder="نام خانوادگی"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <input
          onChange={handleChange}
          name="phone"
          value={form.phone}
          placeholder="شماره همراه"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <input
          onChange={handleChange}
          name="address"
          value={form.address}
          placeholder="نشانی"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
        <Button onClick={handleAdd}>افزودن سرنخ</Button>
      </div>
      <ListLead leads={leads} />
    </div>
  );
};

export default AddLead;
