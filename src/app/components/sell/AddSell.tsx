"use client";

import React, { useCallback, useState } from "react";

import { Sell } from "@/types/types";

import Button from "../ui/Button";
import ListSell from "./ListSell";
import { useSellStorage } from "./hook/useSellStorage";

const AddSell: React.FC = () => {
  const {sells, addSell, editSell, deleteSell} = useSellStorage()
  const [form, setForm] = useState<Omit<Sell, "id">>({
    quantity: "",
    name: "",
    description: "",
    madeIn: "",
    sellPrice: "",
    purchesPrice: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.currentTarget.name as keyof Omit<Sell, "id">;
      const value = e.currentTarget.value;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleAdd = useCallback(() => {
    if (!form.name.trim()) return;
    addSell({id: Date.now().toString(),...form})
    
    setForm({
      name: "",
      quantity: "",
      description: "",
      madeIn: "",
      sellPrice: "",
      purchesPrice: "",
    });
  }, [form]);





  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="font-bold text-white text-xl md:text-2xl mb-6">
        اجناس را وارد کنید
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-inner">
        <input
          name="name"
          value={form.name}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          placeholder="نام محصول"
          onChange={handleChange}
        />

        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition "
          placeholder="تعداد"
        />

        <input
          name="madeIn"
          value={form.madeIn}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition "
          placeholder="ساخت"
          onChange={handleChange}
        />

        <input
          name="sellPrice"
          value={form.sellPrice}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition "
          placeholder="قیمت فروش"
          onChange={handleChange}
        />

        <input
          name="purchesPrice"
          value={form.purchesPrice}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition "
          placeholder="قیمت خرید"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          rows={5}
          cols={4}
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition "
          onChange={handleChange}
        />
        <Button onClick={handleAdd}>افزودن محصول</Button>
      </div>
      <ListSell sells={sells} onDelete={deleteSell} onEdit={editSell} />
    </div>
  );
};

export default AddSell;
