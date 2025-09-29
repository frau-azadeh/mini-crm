import { useCallback, useEffect, useState } from "react";

import { Admin } from "@/types/types";

// کلید استفاده شده در localStorage
const STORAGE_KEY = "my_app_admins";

export function useAdminStorage() {
  // State محلی برای نگهداری لیست ادمین‌ها
  const [admins, setAdmins] = useState<Admin[]>([]);

  // 🟢 بارگذاری اولیه از localStorage هنگام mount شدن کامپوننت
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY); // خواندن مقدار ذخیره شده
      if (!raw) return; // اگر چیزی پیدا نشد، ادامه نمی‌دهیم
      const parsed = JSON.parse(raw) as Admin[] | null; // تبدیل رشته JSON به آرایه
      if (Array.isArray(parsed)) setAdmins(parsed); // اگر داده درست بود، state را بروز می‌کنیم
    } catch (e) {
      console.error("خطا در خواندن از localStorage:", e);
    }
  }, []);

  // 🟢 ذخیره خودکار در localStorage هر بار که state admins تغییر کند
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(admins));
      // تبدیل آرایه به JSON و ذخیره در localStorage
    } catch (e) {
      console.error("خطا در نوشتن در localStorage:", e);
    }
  }, [admins]);

  // 🟢 اضافه کردن ادمین جدید و بروز رسانی state
  const addAdmin = useCallback((newAdmin: Admin) => {
    setAdmins((prev) => [newAdmin, ...prev]); // اضافه کردن ادمین به ابتدای آرایه
  }, []);

  // 🟢 حذف ادمین بر اساس id
  const deleteAdmin = useCallback((id: Admin["id"]) => {
    setAdmins((prev) => prev.filter((t) => String(t.id) !== String(id)));
    // فیلتر کردن ادمین‌ها و حذف آنی
  }, []);

  // 🟢 ویرایش ادمین
  const editAdmin = useCallback(
    (id: Admin["id"], newData: Omit<Admin, "id">) => {
      setAdmins((prev) =>
        prev.map((t) =>
          String(t.id) === String(id) ? { ...t, ...newData } : t,
        ),
      );
      // اگر id برابر بود، اطلاعات جدید را جایگزین می‌کنیم، در غیر این صورت بدون تغییر می‌ماند
    },
    [],
  );

  // 🟢 پاک کردن همه داده‌ها و localStorage
  const clearAdmins = useCallback(() => {
    setAdmins([]); // خالی کردن state
    localStorage.removeItem(STORAGE_KEY); // حذف کلید از localStorage
  }, []);

  // 🟢 خروجی hook شامل state و توابع مدیریت آن
  return { admins, addAdmin, deleteAdmin, editAdmin, clearAdmins };
}
