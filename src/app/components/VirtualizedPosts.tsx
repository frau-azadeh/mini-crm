"use client"; // اگر این فایل در Next.js باشد، مشخص می‌کند که این یک Client Component است

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import axios, { AxiosError } from "axios";

/** تعریف نوع داده هر پست */
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/** props برای کامپوننت */
type Props = {
  /** تعداد تکرار داده‌ها برای شبیه‌سازی لیست بلند */
  duplicateFactor?: number;
  /** ارتفاع کل کامپوننت بر حسب پیکسل */
  height?: number;
};

export default function VirtualizedPosts({ duplicateFactor = 1, height = 600 }: Props) {
  /** state برای ذخیره لیست پست‌ها */
  const [posts, setPosts] = useState<Post[]>([]);
  /** state برای مدیریت لودینگ */
  const [loading, setLoading] = useState<boolean>(true);
  /** state برای مدیریت خطا */
  const [error, setError] = useState<string | null>(null);

  /** useEffect برای fetch داده‌ها از API */
  useEffect(() => {
    const controller = new AbortController(); // برای لغو درخواست اگر component unmount شود
    let mounted = true; // برای جلوگیری از setState بعد از unmount

    async function load() {
      setLoading(true); // شروع حالت لودینگ
      setError(null);   // پاک کردن خطای قبلی

      try {
        // fetch داده‌ها از API با پشتیبانی از abort
        const res = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: controller.signal }
        );

        if (!mounted) return; // اگر component unmount شد، کاری نکن

        // تکرار داده‌ها بر اساس duplicateFactor برای شبیه‌سازی لیست طولانی
        const safeFactor = Math.max(1, Math.trunc(duplicateFactor));
        const big = Array.from({ length: safeFactor }).flatMap(() => res.data);

        // به هر آیتم یک id جدید اختصاص می‌دهیم تا unique باشد
        const normalized = big.map((p, idx) => ({ ...p, id: idx + 1 }));
        setPosts(normalized);
      } catch (err: unknown) {
        if (!mounted) return; // اگر component unmount شد، کاری نکن

        // مدیریت خطا
        if (axios.isAxiosError(err)) {
          const ax = err as AxiosError;
          if (ax.code === "ERR_CANCELED") return; // لغو شده، خطا نمایش داده نشود
          setError(ax.message ?? "خطای شبکه");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        if (mounted) setLoading(false); // پایان حالت لودینگ
      }
    }

    load(); // اجرای تابع fetch داده‌ها

    // cleanup: لغو request و جلوگیری از memory leak
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [duplicateFactor]);

  /** memoization داده‌ها برای جلوگیری از رندر غیر ضروری */
  const items = useMemo(() => posts, [posts]);

  /** virtualizer برای رندر فقط آیتم‌های قابل مشاهده */
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowHeight = 88; // ارتفاع ثابت هر ردیف

  const virtualizer = useVirtualizer({
    count: items.length,                 // تعداد آیتم‌ها
    getScrollElement: () => parentRef.current, // عنصر scrollable
    estimateSize: () => rowHeight,       // ارتفاع تقریبی هر ردیف
    overscan: 6,                         // تعداد آیتم اضافه برای smooth scroll
  });

  /** حالات مختلف UI */
  if (loading)
    return (
      <div
        className="max-w-4xl mx-auto mt-5 p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl shadow-lg"
      >
        {/* نمایش لودینگ */}
        <div className="text-center text-gray-300 animate-pulse">در حال بارگذاری...</div>
      </div>
    );

  if (error)
    return (
      <div
        className="max-w-4xl mx-auto mt-5 p-6 bg-red-50 dark:bg-red-900 text-red-600 rounded-xl shadow-lg text-center"
      >
        خطا: {error}
      </div>
    );

  if (items.length === 0)
    return (
      <div
        className="max-w-4xl mx-auto mt-5 p-6 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-lg text-center"
      >
        داده‌ای موجود نیست.
      </div>
    );

  /** رندر لیست مجازی */
  return (
    <div
      className="max-w-4xl mx-auto mt-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
      style={{ height }} // استفاده از props.height برای ارتفاع کلی
    >
      {/* هدر لیست */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">لیست پست‌ها</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">{items.length} آیتم</div>
      </div>

      {/* کانتینر scrollable */}
      <div className="overflow-auto" ref={parentRef} style={{ height: height - 64 }}>
        {/* ارتفاع واقعی برای virtualizer */}
        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
          {virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
            const item = items[virtualRow.index];
            if (!item) return null;

            /** هر ردیف به صورت absolute رندر می‌شود */
            const style: React.CSSProperties = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
              height: virtualRow.size,
            };

            return (
              <article
                key={item.id}
                style={style}
                className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
              >
                <div className="flex items-start gap-4">
                  {/* شماره آیتم */}
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 flex items-center justify-center font-semibold">
                    {item.id}
                  </div>

                  {/* محتوای پست */}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
