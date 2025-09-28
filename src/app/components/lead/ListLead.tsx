import React, { useCallback, useMemo } from "react";

import { Lead } from "@/types/types";

import Button from "../ui/Button";

interface ListLeadTableType {
  leads: Lead[];
  onDelete?:(id: Lead["id"]) => void
}

const ListLead: React.FC<ListLeadTableType> = ({ leads, onDelete }) => {
  const countLead = useMemo(() => leads.length, [leads]);

  const handleDelete = useCallback((id: Lead["id"])=>{
    onDelete?.(id)
  },[onDelete])


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
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {lead.family}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {lead.address}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {lead.phone}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="call">ویرایش</Button>
                    <Button variant="danger" onClick={()=>handleDelete(lead.id)}>حذف</Button>
                  </div>
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
