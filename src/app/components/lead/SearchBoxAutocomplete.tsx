"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

// ---------------------------
// SearchBoxAutocomplete.tsx
// نسخه اصلاح شده با بخش‌بندی و توضیح خط به خط
// ---------------------------

export type Lead = {
  id: string;
  name?: string;
  family?: string;
  phone?: string;
  address?: string;
};

type Props = {
  value: string; // 🔹 مقدار فعلی داخل input
  onChange: (v: string) => void; // 🔹 ارسال مقدار جدید به والد
  items: Lead[]; // 🔹 داده‌ها برای پیشنهادها
  fields?: Array<keyof Omit<Lead, "id">>; // 🔹 فیلدهایی که جستجو روی آن‌ها انجام شود
  placeholder?: string; // 🔹 متن راهنمای input
  debounceMs?: number; // 🔹 مدت debounce قبل از بروزرسانی پیشنهادها
};

export default function SearchBoxAutocomplete({
  value,
  onChange,
  items,
  fields = ["name", "family", "phone", "address"],
  placeholder = "جستجو...",
  debounceMs = 200,
}: Props) {
  // ==========================
  // 1️⃣ Refs
  // ==========================
  const rootRef = useRef<HTMLDivElement | null>(null); // 🔹 برای تشخیص کلیک بیرون
  const inputRef = useRef<HTMLInputElement | null>(null); // 🔹 برای فوکوس دادن به input

  // ==========================
  // 2️⃣ State ها
  // ==========================
  const [local, setLocal] = useState<string>(value); // 🔹 مقدار input
  const [suggests, setSuggests] = useState<string[]>([]); // 🔹 لیست پیشنهادها
  const [open, setOpen] = useState<boolean>(false); // 🔹 آیا لیست باز است؟
  const [active, setActive] = useState<number>(-1); // 🔹 آیتم انتخاب شده با کیبورد یا موس

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 🔹 تایمر debounce
  const lastSentRef = useRef<string | null>(null); // 🔹 آخرین مقدار فرستاده شده به والد

  // ==========================
  // 3️⃣ جمع آوری مقادیر برای پیشنهاد
  // ==========================
  // 🔹 flatValues: آرایه‌ای شامل تمام مقادیر فیلدهای مشخص شده از items
  const flatValues = useMemo(() => {
    // 🔹 جمع‌آوری تمام مقادیر فیلدهای مشخص شده از items
    return items
      .flatMap((it) =>
        fields
          .map((f) => it[f])
          .filter((v) => v !== undefined && v !== null) // 🔹 حذف مقادیر null یا undefined
          .map(String), // 🔹 تبدیل همه مقادیر به رشته
      )
      .filter((v, i, arr) => arr.indexOf(v) === i); // 🔹 یکتا کردن مقادیر
  }, [items, fields]); // 🔹 فقط وقتی items یا fields تغییر کنند محاسبه می‌شود

  const computeSuggestions = useCallback(
    (q: string) => {
      const t = q.trim().toLowerCase();
      if (!t) return [];
      // 🔹 فیلتر مقادیر flatValues که شامل متن تایپ شده باشند، حداکثر 10 مورد
      return flatValues.filter((s) => s.toLowerCase().includes(t)).slice(0, 10);
    },
    [flatValues], // 🔹 فقط وقتی flatValues تغییر کند، تابع دوباره ساخته می‌شود
  );

  // ==========================
  // 4️⃣ Debounce و بروزرسانی لیست
  // ==========================
  useEffect(() => {
    // 🔹 اگر تایمر قبلی هنوز فعال است، آن را پاک می‌کنیم تا دوباره اجرا نشود
    if (timerRef.current) clearTimeout(timerRef.current);

    // 🔹 ایجاد یک تایمر جدید برای debounce
    timerRef.current = setTimeout(() => {
      // 🔹 محاسبه پیشنهادها بر اساس مقدار فعلی input
      const next = computeSuggestions(local);

      // 🔹 به‌روزرسانی state پیشنهادها
      setSuggests(next);

      // 🔹 تعیین آیتم فعال (highlight) با کیبورد
      setActive((prev) =>
        prev >= 0 && prev < next.length ? prev : next.length > 0 ? 0 : -1,
      );

      // 🔹 باز یا بسته کردن لیست پیشنهادها
      setOpen(next.length > 0);

      // 🔹 اگر مقدار فعلی با آخرین مقدار ارسال شده به والد متفاوت است، مقدار جدید را ارسال کنیم
      if (lastSentRef.current !== local) {
        lastSentRef.current = local; // ذخیره مقدار جدید
        onChange(local); // ارسال به والد
      }
    }, debounceMs); // 🔹 مدت زمان debounce قبل از اجرا

    // 🔹 تابع cleanup: هنگام unmount یا تغییر وابستگی‌ها، تایمر قبلی را پاک می‌کنیم
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [local, computeSuggestions, debounceMs, onChange]);
  // 🔹 وابستگی‌ها: وقتی local، computeSuggestions، debounceMs یا onChange تغییر کند، effect دوباره اجرا می‌شود

  // ==========================
  // 5️⃣ اعمال یک پیشنهاد
  // ==========================
  // 🔹 تابع apply برای وقتی که کاربر روی یک پیشنهاد کلیک می‌کند یا Enter می‌زند
  const apply = (s: string) => {
    // 🔹 اگر تایمر debounce فعال است، آن را پاک می‌کنیم تا بلوک debounce اجرا نشود
    if (timerRef.current) clearTimeout(timerRef.current);

    // 🔹 مقدار input را به مقدار انتخاب شده تغییر می‌دهیم
    setLocal(s);

    // 🔹 ذخیره مقدار انتخاب شده به عنوان آخرین مقدار ارسال شده به والد
    lastSentRef.current = s;

    // 🔹 ارسال مقدار جدید به والد (تا مثلا فرم یا state والد به‌روز شود)
    onChange(s);

    // 🔹 بستن لیست پیشنهادها بعد از انتخاب
    setOpen(false);

    // 🔹 حذف انتخاب فعال قبلی (هیچ آیتم فعال نیست)
    setActive(-1);

    // 🔹 فوکوس روی input بعد از انتخاب تا کاربر بتواند ادامه دهد یا تایپ کند
    inputRef.current?.focus();
  };

  // ==========================
  // 6️⃣ دکمه پاک کردن
  // ==========================
  // 🔹 تابع handleClear برای وقتی که کاربر روی دکمه "پاک کردن" کلیک می‌کند
  const handleClear = () => {
    // 🔹 اگر تایمر debounce فعال است، آن را پاک می‌کنیم تا پیشنهادها دوباره اجرا نشوند
    if (timerRef.current) clearTimeout(timerRef.current);

    // 🔹 پاک کردن مقدار input
    setLocal("");

    // 🔹 ذخیره مقدار جدید خالی به عنوان آخرین مقدار ارسال شده به والد
    lastSentRef.current = "";

    // 🔹 ارسال مقدار خالی به والد
    onChange("");

    // 🔹 پاک کردن لیست پیشنهادها
    setSuggests([]);

    // 🔹 بستن لیست پیشنهادها
    setOpen(false);

    // 🔹 حذف انتخاب فعال (هیچ آیتمی انتخاب نشده)
    setActive(-1);

    // 🔹 فوکوس روی input بعد از پاک کردن تا کاربر بتواند دوباره تایپ کند
    inputRef.current?.focus();
  };

  // ==========================
  // 7️⃣ مدیریت کیبورد
  // ==========================
  // 🔹 تابع onKeyDown برای مدیریت کلیدهای کیبورد داخل input
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 🔹 وقتی کلید پایین (ArrowDown) زده شد
    if (e.key === "ArrowDown") {
      e.preventDefault(); // جلوگیری از اسکرول پیش‌فرض صفحه

      if (!open && suggests.length > 0) {
        // 🔹 اگر لیست پیشنهاد بسته است ولی پیشنهاد داریم، بازش می‌کنیم و اولین آیتم را فعال می‌کنیم
        setOpen(true);
        setActive(0);
      } else {
        // 🔹 اگر لیست باز است، آیتم فعال را به پایین حرکت می‌دهیم (حداکثر تا آخرین آیتم)
        setActive((a) => Math.min(a + 1, suggests.length - 1));
      }

      // 🔹 وقتی کلید بالا (ArrowUp) زده شد
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // جلوگیری از اسکرول پیش‌فرض صفحه

      // 🔹 آیتم فعال را به بالا حرکت می‌دهیم (حداقل 0)
      setActive((a) => Math.max(a - 1, 0));

      // 🔹 وقتی کلید Enter زده شد
    } else if (e.key === "Enter") {
      // 🔹 فقط اگر یک آیتم فعال انتخاب شده باشد، آن را اعمال می‌کنیم
      if (active >= 0 && active < suggests.length) {
        e.preventDefault(); // جلوگیری از submit فرم یا رفتار پیش‌فرض
        apply(suggests[active]); // انتخاب آیتم فعال
      }

      // 🔹 وقتی کلید Escape زده شد
    } else if (e.key === "Escape") {
      // 🔹 لغو تایمر debounce
      if (timerRef.current) clearTimeout(timerRef.current);

      // 🔹 بستن لیست پیشنهادها
      setOpen(false);

      // 🔹 هیچ آیتم فعال نیست
      setActive(-1);

      // 🔹 خارج شدن فوکوس از input
      inputRef.current?.blur();
    }
  };

  // ==========================
  // 8️⃣ کلیک بیرون برای بستن لیست
  // ==========================
  useEffect(() => {
    // 🔹 تابعی که بررسی می‌کند کاربر کجا کلیک کرده است
    const onDoc = (e: MouseEvent) => {
      // 🔹 اگر مرجع ریشه کامپوننت هنوز آماده نیست، کاری انجام نمی‌دهیم
      if (!rootRef.current) return;

      // 🔹 اگر کلیک خارج از محدوده کامپوننت بود
      if (!rootRef.current.contains(e.target as Node)) {
        // 🔹 لغو تایمر debounce در صورت فعال بودن
        if (timerRef.current) clearTimeout(timerRef.current);

        // 🔹 بستن لیست پیشنهادها
        setOpen(false);

        // 🔹 پاک کردن آیتم فعال
        setActive(-1);
      }
    };

    // 🔹 افزودن listener به کل سند برای کلیک ماوس
    document.addEventListener("mousedown", onDoc);

    // 🔹 پاکسازی listener هنگام unmount یا تغییر effect
    return () => document.removeEventListener("mousedown", onDoc);
  }, []); // 🔹 وابستگی‌ها خالی: فقط هنگام mount/unmount اجرا می‌شود

  // ==========================
  // 9️⃣ رندر UI
  // ==========================
  return (
    <div ref={rootRef} className="relative">
      {/* 🔹 Input اصلی */}
      <input
        ref={inputRef} // 🔹 مرجع به input برای فوکوس و مدیریت کیبورد
        type="text"
        value={local} // 🔹 مقدار داخل input از state گرفته می‌شود
        onChange={(e) => setLocal(e.target.value)} // 🔹 به‌روزرسانی state هنگام تایپ کاربر
        onFocus={() => {
          // 🔹 وقتی input فوکوس شد، پیشنهادها محاسبه می‌شوند
          const next = computeSuggestions(local);
          setSuggests(next); // 🔹 به‌روزرسانی لیست پیشنهادها
          setActive(next.length > 0 ? 0 : -1); // 🔹 اولین آیتم فعال می‌شود یا -1 اگر لیست خالی
          setOpen(next.length > 0); // 🔹 باز کردن لیست اگر پیشنهاد وجود دارد
        }}
        onKeyDown={onKeyDown} // 🔹 مدیریت کلیدهای کیبورد (ArrowUp, ArrowDown, Enter, Escape)
        placeholder={placeholder} // 🔹 متن placeholder داخل input
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400" // 🔹 استایل با Tailwind
      />

      {/* 🔹 دکمه پاک کردن متن */}
      <button
        type="button"
        onClick={handleClear} // 🔹 پاک کردن متن و بستن لیست پیشنهادها
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm" // 🔹 استایل با Tailwind
      >
        ✕
      </button>

      {/* 🔹 لیست پیشنهادها */}
      {open && suggests.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-auto z-50">
          {suggests.map((s, i) => (
            <li
              key={`${s}-${i}`} // 🔹 کلید یکتا برای هر آیتم
              onMouseDown={(ev) => {
                ev.preventDefault(); // 🔹 جلوگیری از blur قبل از کلیک
                apply(s); // 🔹 اعمال مقدار انتخاب شده
              }}
              onMouseEnter={() => setActive(i)} // 🔹 هنگام هاور، آیتم فعال تغییر می‌کند
              className={`px-3 py-2 text-sm cursor-pointer ${i === active ? "bg-indigo-50" : "hover:bg-gray-100"}`} // 🔹 استایل آیتم فعال و هاور
            >
              {s} {/* 🔹 متن پیشنهاد */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
