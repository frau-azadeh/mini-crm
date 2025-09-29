"use client";

import React, { useEffect, useRef, useState } from "react";

import { Lead } from "@/types/types";

/**
 * SearchBoxAutocomplete
 *
 * Props:
 * - value: مقدار فعلی سرچ
 * - onChange: وقتی مقدار تغییر کرد صدا میشه
 * - items: آرایه‌ی سرنخ‌ها (Lead[]) که از آنها پیشنهاد استخراج میشه
 * - fields: کدام فیلدها را برای پیشنهاد بررسی کنیم (پیش‌فرض: name,family,phone,address)
 * - placeholder: متن placeholder
 *
 * رفتار:
 * - وقتی تایپ می‌کنی، بعد از debounce کوتاه پیشنهادها ساخته میشه
 * - کلیک روی یک پیشنهاد مقدار را انتخاب می‌کند
 * - کیبورد (ArrowUp/ArrowDown/Enter/Escape) ساده پشتیبانی شده
 */

type Props = {
  value: string;
  onChange: (v: string) => void;
  items: Lead[]; // داده‌ها برای استخراج پیشنهاد
  fields?: Array<keyof Omit<Lead, "id">>;
  placeholder?: string;
  debounceMs?: number;
};

export default function SearchBoxAutocomplete({
  value,
  onChange,
  items,
  fields = ["name", "family", "phone", "address"],
  placeholder = "جستجو...",
  debounceMs = 200,
}: Props) {
  const [local, setLocal] = useState(value);
  const [suggests, setSuggests] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setLocal(value), [value]);

  // کلیک بیرون برای بستن لیست
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // تابعی که پیشنهادها را از items می‌سازد
  const buildSuggestions = (q: string) => {
    if (!q.trim()) {
      setSuggests([]);
      setOpen(false);
      setActive(-1);
      return;
    }
    const lowered = q.toLowerCase();

    // جمع‌آوری مقادیر از فیلدهای مشخص
    const values: string[] = [];
    for (const it of items) {
      for (const f of fields) {
        const v = (it as any)[f];
        if (v) values.push(String(v).trim());
      }
    }

    // فیلتر و یکتا کردن و حداکثر 10 پیشنهاد
    const filtered = Array.from(
      new Set(values.filter((s) => s.toLowerCase().includes(lowered))),
    ).slice(0, 10);

    setSuggests(filtered);
    setOpen(filtered.length > 0);
    setActive(-1);
  };

  // debounce کردن تایپ
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => buildSuggestions(local), debounceMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]); // فقط local در dependency تا debounce کار کنه

  // وقتی کاربر روی پیشنهاد کلیک کرد
  const apply = (s: string) => {
    setLocal(s);
    onChange(s);
    setOpen(false);
    setActive(-1);
  };

  // کیبورد هندلینگ
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, suggests.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (active >= 0 && active < suggests.length) {
        e.preventDefault();
        apply(suggests[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input
        type="text"
        value={local}
        onChange={(e) => {
          setLocal(e.target.value);
          // مقدار واقعی فقط بعد از debounce به parent ارسال می‌شود
          // اگر خواستی فوراً هم بفرستیم، onChange(e.target.value) بزن
        }}
        onBlur={() => {
          // onBlur را مدیریت نمی‌کنیم چون کلیک روی لیست با mousedown کنترل می‌شود
        }}
        onFocus={() => {
          if (suggests.length > 0) setOpen(true);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="search"
      />

      {open && suggests.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded-md mt-1 max-h-48 overflow-auto z-20 shadow-md">
          {suggests.map((s, i) => (
            <li
              key={i}
              onMouseDown={(ev) => {
                // mousedown به جای click تا blur قبل از انتخاب اجرا نشه
                ev.preventDefault();
                apply(s);
              }}
              onMouseEnter={() => setActive(i)}
              className={`px-3 py-2 text-sm cursor-pointer ${
                i === active ? "bg-indigo-50" : "hover:bg-gray-100"
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
