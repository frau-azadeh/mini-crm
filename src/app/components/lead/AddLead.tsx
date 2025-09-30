"use client";

import React, { useCallback, useMemo, useState } from "react";

import { Lead } from "@/types/types";

import Button from "../ui/Button";
import ListLead from "./ListLead";
// import SearchBox from "./SearchBox";
import SearchBoxAutocomplete from "./SearchBoxAutocomplete";
import { useLeadStorage } from "./hook/useLeadStorage";

const AddLead: React.FC = () => {
  const { leads, addLead, deleteLead, editLead } = useLeadStorage();
  const [form, setForm] = useState<Omit<Lead, "id">>({
    name: "",
    family: "",
    phone: "",
    address: "",
  });

  // state برای سرچ (مقداری که SearchBox به ما میده)
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAdd = useCallback(() => {
    if (!form.name.trim()) return;
    addLead({ id: Date.now().toString(), ...form });
    setForm({
      name: "",
      family: "",
      phone: "",
      address: "",
    });
  }, [form]);

  // فیلتر کردن لیست بر اساس searchTerm (name, family, phone, address)
// 🔹 useMemo: استفاده شده تا فقط وقتی `leads` یا `searchTerm` تغییر کنند، 
//    این محاسبه دوباره انجام شود و عملکرد بهتری داشته باشیم
const filteredLeads = useMemo(() => {

  // 🔹 اگر `searchTerm` خالی یا فقط فاصله باشد، همان leads اصلی را برگردان
  if (!searchTerm.trim()) return leads;

  // 🔹 متن جستجو را به حروف کوچک تبدیل می‌کنیم تا جستجو case-insensitive باشد
  const q = searchTerm.toLowerCase();

  // 🔹 فیلتر کردن آرایه leads
  return leads.filter((lead) =>
    // 🔹 some: بررسی می‌کند آیا **حداقل یک عنصر** از آرایه true بدهد
    [lead.name, lead.family, lead.phone, lead.address].some((v) =>
      // 🔹 String(v): تبدیل مقدار به رشته در صورت undefined یا number بودن
      // 🔹 toLowerCase(): همه حروف را کوچک می‌کند تا جستجو بدون توجه به حروف بزرگ/کوچک انجام شود
      // 🔹 includes(q): بررسی می‌کند آیا رشته شامل متن جستجو هست یا نه
      String(v).toLowerCase().includes(q),
    ),
  );

// 🔹 وابستگی‌ها: هر بار که `leads` یا `searchTerm` تغییر کنند، محاسبه دوباره انجام می‌شود
}, [leads, searchTerm]);


  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        سرنخ ها را وارد کنید
      </h2>

      <div className="bg-white rounded-lg p-6 shadow-inner mb-4">
        <input
          onChange={handleChange}
          name="name"
          value={form.name}
          placeholder="نام"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
        />
        <input
          onChange={handleChange}
          name="family"
          value={form.family}
          placeholder="نام خانوادگی"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
        />
        <input
          onChange={handleChange}
          name="phone"
          value={form.phone}
          placeholder="شماره همراه"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
        />
        <input
          onChange={handleChange}
          name="address"
          value={form.address}
          placeholder="نشانی"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
        />
        <Button onClick={handleAdd}>افزودن سرنخ</Button>
      </div>

      {/* اینجا کامپوننت سرچ جداست 
      <SearchBox  
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="جستجو در سرنخ‌ها..."
      />*/}
      <SearchBoxAutocomplete
        value={searchTerm}
        onChange={setSearchTerm}
        items={leads}
        // fields اختیاری است؛ اگر ندی از name,family,phone,address استفاده می‌شود
        placeholder="جستجو (کلیک روی پیشنهاد مقدار را پر می‌کند)"
      />
      {/* لیست فیلترشده به ListLead پاس داده میشه */}
      <ListLead leads={filteredLeads} onDelete={deleteLead} onEdit={editLead} />
    </div>
  );
};

export default AddLead;
