import React, { useCallback, useMemo, useState } from "react";

import { Lead } from "@/types/types";

import Button from "../ui/Button";

interface ListLeadTableType {
  leads: Lead[];
  onDelete?: (id: Lead["id"]) => void;
  onEdit?: (id: Lead["id"], newData: Omit<Lead, "id">) => void;
}

const ListLead: React.FC<ListLeadTableType> = ({ leads, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<Lead["id"] | null>(null);
  const [editData, setEditData] = useState<Omit<Lead, "id"> | null>(null);

  const countLead = useMemo(() => leads.length, [leads]);

  const handleDelete = useCallback(
    (id: Lead["id"]) => {
      onDelete?.(id);
    },
    [onDelete],
  );

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editData) return;

      const name = e.currentTarget.name as keyof Omit<Lead, "id">;
      const value = e.currentTarget.value;
      setEditData((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    [editData],
  );

  const handleStartEdit = useCallback((lead: Lead) => {
    setEditingId(lead.id);
    setEditData({
      name: lead.name,
      family: lead.family,
      phone: lead.phone,
      address: lead.address,
    });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditData(null);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!editData || editingId === null) return;
    onEdit?.(editingId, editData);
    setEditingId(null);
    setEditData(null);
  }, [editData, editingId, onEdit]);

  return (
    <div className="mt-4">
      <p className="font-bold text-white mb-2">
        تعداد سرنخ های ثبت شده{countLead}
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
                شماره همراه
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نشانی
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  <p>هیچ سرنخی ثبت نشده است</p>
                </td>
              </tr>
            )}
            {leads.map((lead, index) => (
              <tr key={lead.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(lead.id) ? (
                    <input
                      onChange={handleFieldChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="name"
                      value={editData?.name ?? ""}
                    />
                  ) : (
                    <span>{lead.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(lead.id) ? (
                    <input
                      onChange={handleFieldChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="family"
                      value={editData?.family ?? ""}
                    />
                  ) : (
                    <span>{lead.family}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(lead.id) ? (
                    <input
                      onChange={handleFieldChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="address"
                      value={editData?.address ?? ""}
                    />
                  ) : (
                    <span>{lead.address}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(lead.id) ? (
                    <input
                      onChange={handleFieldChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="phone"
                      value={editData?.phone ?? ""}
                    />
                  ) : (
                    <span>{lead.phone}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editingId) === String(lead.id) ? (
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
                        onClick={() => handleStartEdit(lead)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(lead.id)}
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

export default ListLead;
