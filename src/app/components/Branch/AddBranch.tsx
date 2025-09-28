"use client";

import React, { useCallback, useState } from "react";

import { Branch } from "@/types/types";

import Button from "../ui/Button";

const AddBranch: React.FC = () => {
  const [branchs, setBranchs] = useState<Branch[]>([]);
  const [form, setForm] = useState<Omit<Branch, "id">>({
    city: "",
    phone: "",
    address: "",
    status: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAdd = useCallback(() => {
    if (!form.city.trim()) return;

    const newBranch: Branch = {
      id: Date.now().toString(),
      ...form,
    };
    setBranchs((prev) => [...prev, newBranch]);
    setForm({
      city: "",
      phone: "",
      address: "",
      status: "",
    });
  }, [form]);

  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-lg rounded-xl md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        اطلاعات شعب را وارد کنید!
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner">
        <input
          name="city"
          value={form.city}
          placeholder="نام شهر"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <input
          name="address"
          value={form.address}
          placeholder="نشانی"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="شماره همراه"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <input
          name="status"
          value={form.status}
          placeholder="وضعیت"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <Button onClick={handleAdd}>ذخیره</Button>
      </div>
    </div>
  );
};

export default AddBranch;
