import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Admin } from "@/types/types";

import Button from "../ui/Button";

interface ListAdminTableProps {
  admins: Admin[];
  onDelete?: (id: Admin["id"]) => void;
  onEdit?: (id: Admin["id"], newData: Omit<Admin, "id">) => void;
}
const ListAdmin: React.FC<ListAdminTableProps> = ({
  admins,
  onEdit,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<Admin["id"] | null>(null);
  const [editData, setEditData] = useState<Omit<Admin, "id"> | null>(null);
  const countAdmin = useMemo(() => admins.length, [admins]);

  const handleDelete = useCallback(
    (id: Admin["id"]) => {
      onDelete?.(id);
    },
    [onDelete],
  );

  const handleFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!editData) return;
      const name = e.currentTarget.name as keyof Omit<Admin, "id">;
      const value = e.currentTarget.value;
      setEditData((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    [editData],
  );
  const handleStartEdit = useCallback((admin: Admin) => {
    setEditingId(admin.id);
    setEditData({
      name: admin.name,
      family: admin.family,
      userName: admin.userName,
      password: admin.password,
    });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditData(null);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingId === null || !editData) return;
    onEdit?.(editingId, editData);
    setEditingId(null);
    setEditData(null);
  }, [editData, onEdit, editingId]);
  return (
    <div className="mt-4">
      <p className="font-bold text-white mb-2">
        تعداد ادمین های ثبت شده{countAdmin}
      </p>
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نام
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نام خانوادگی
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نام کاربری
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                پسورد
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {admins.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  <p>هیچ ادمینی ثبت نشده است!</p>
                </td>
              </tr>
            )}
            {admins.map((admin, index) => (
              <tr key={admin.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700">
                  {String(editingId) === String(admin.id) ? (
                    <input
                      name="name"
                      value={editData?.name ?? ""}
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span>{admin.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(admin.id) ? (
                    <input
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="family"
                      value={editData?.family ?? ""}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span>{admin.family}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(admin.id) ? (
                    <input
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="userName"
                      value={editData?.userName ?? ""}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span>{admin.userName}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(admin.id) ? (
                    <input
                      name="password"
                      value={editData?.password ?? ""}
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span> {admin.password}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(admin.id) ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button onClick={handleSaveEdit} variant="call">
                        ذخیره
                      </Button>
                      <Button onClick={handleCancelEdit} variant="danger">
                        انصراف
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="call"
                        onClick={() => handleStartEdit(admin)}
                      >
                        ویرایش
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(admin.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAdmin;
