"use client";

import React, { useMemo, useState } from "react";

import { Admin } from "@/types/types";

import Button from "../ui/Button";
import ListAdmin from "./ListAdmin";
import SearchBoxAdmin from "./SearchBoxAdmin";
import { useAdminStorage } from "./hook/useAdminStorage";

const AddAdmin: React.FC = () => {
  const { admins, addAdmin, deleteAdmin, editAdmin, clearAdmins } =
    useAdminStorage();
  const [searchAdmin, setSearchAdmin] = useState("");
  const [form, setForm] = useState<Omit<Admin, "id">>({
    name: "",
    family: "",
    userName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addAdmin({ id: Date.now().toString(), ...form });
    setForm({ name: "", family: "", userName: "", password: "" });
  };

  const filteredAdmin = useMemo(() => {
    if (!searchAdmin.trim()) return admins;
    const q = searchAdmin.toLowerCase();
    return admins.filter((admin) =>
      [admin.name, admin.family].some((v) =>
        String(v).toLowerCase().includes(q),
      ),
    );
  }, [admins, searchAdmin]);

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

        <div className="flex gap-2">
          <Button onClick={handleAdd}>افزودن ادمین</Button>
          <Button variant="danger" onClick={clearAdmins}>
            حذف همه
          </Button>
        </div>
      </div>
      <SearchBoxAdmin
        items={admins}
        value={searchAdmin}
        onChange={setSearchAdmin}
      />
      <ListAdmin
        admins={filteredAdmin}
        onDelete={deleteAdmin}
        onEdit={editAdmin}
      />
    </div>
  );
};

export default AddAdmin;
