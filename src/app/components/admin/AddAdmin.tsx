"use client";

import React, { useCallback, useMemo, useState } from "react";

import { Admin } from "@/types/types";

import Button from "../ui/Button";
import ListAdmin from "./ListAdmin";

const AddAdmin: React.FC = () => {
  const [admin, setAdmin] = useState<Admin[]>([]);
  const [form, setForm] = useState<Omit<Admin, "id">>({
    name: "",
    family: "",
    userName: "",
    password: "",
  });

  const handleAdd = useCallback(() => {
    if (!form.name.trim()) return;

    const newAdmin: Admin = {
      id: Date.now().toString(),
      ...form,
    };
    setAdmin((prev) => [...prev, newAdmin]);
    setForm({
      name: "",
      family: "",
      userName: "",
      password: "",
    });
  }, [form]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDelete = useCallback((id:Admin["id"])=>{
    setAdmin((prev)=>prev.filter((t)=>String(t.id)!== String(id)))
  },[])

  return (
    <div className="md:mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow rounded-xl p-6 md:p-8 mr-2 ml-2 mt-5">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        اطلاعات ادمین را وارد کنید!
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner">
        <input
          name="name"
          value={form.name}
          placeholder="نام"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
        />

        <input
          name="family"
          value={form.family}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
          placeholder="نام خانوادگی"
        />

        <input
          name="userName"
          value={form.userName}
          placeholder="نام کاربری"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
        />

        <input
          name="password"
          value={form.password}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          placeholder="رمز عبور"
          type="password"
          onChange={handleChange}
        />
        <Button onClick={handleAdd}>افزودن ادمین</Button>
      </div>
      <ListAdmin admins={admin} onDelete={handleDelete}/>
    </div>
  );
};

export default AddAdmin;
