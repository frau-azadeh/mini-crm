import React, { useCallback, useMemo, useState } from "react";

import { Branch } from "@/types/types";

import Button from "../ui/Button";

const AddBranch: React.FC = () => {
  const [branch, setBranch] = useState<Branch[]>([]);
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
    setBranch((prev) => [...prev, newBranch]);
    setForm({ city: "", phone: "", address: "", status: "" });
  }, [form]);

  const countBranch = useMemo(() => branch.length, [branch]);

  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        اطلاعات شغب را وارد کنید:
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner">
        <span className="block text-sm text-gray-600 mb-4">
          تعداد شعب وارد شده
          <span className="font-semibold text-slate-700">{countBranch}</span>
        </span>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="نام شهر"
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
          name="status"
          value={form.status}
          placeholder="وضعیت شعبه"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
        />

        <Button onClick={handleAdd}>شعبه جدید</Button>
      </div>
    </div>
  );
};

export default AddBranch;
