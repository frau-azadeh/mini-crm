"use client";

import React, { useEffect, useState } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** debounce به میلی‌ثانیه (پیش‌فرض 250ms) */
  debounceMs?: number;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "جستجو...",
  debounceMs = 250,
}: SearchBoxProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      // فقط وقتی تغییر واقعی هست، فراخوانی کن
      if (local !== value) onChange(local);
    }, debounceMs);
    return () => clearTimeout(t);
  }, [local, debounceMs, onChange, value]);

  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      className="w-full mb-4 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
      aria-label="search"
    />
  );
}
