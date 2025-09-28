import React, { useCallback, useMemo } from "react";

import { Branch } from "@/types/types";

import Button from "../ui/Button";

interface ListBranchTableProps {
  branches: Branch[];
  onDelete: (id: Branch["id"])=> void
}
const ListBranch: React.FC<ListBranchTableProps> = ({ branches, onDelete }) => {
  const countBranches = useMemo(() => branches.length, [branches]);

  const handelDelete = useCallback((id: Branch["id"])=>{
    onDelete?.(id)
  },[onDelete])
  return (
    <div className="mt-4">
      <p className="text-white">تعداد شعب ثبت شده{countBranches}</p>
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نام شعب
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نشانی
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                شماره تلفن
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                وضعیت
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {branches.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  <p>هیچ شعبه ای وجود ندارد</p>
                </td>
              </tr>
            )}
            {branches.map((branch, index) => (
              <tr key={branch.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {branch.city}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {branch.address}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {branch.phone}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {branch.status}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  <div className="flex gap-2 items-center justify-center">
                    <Button variant="call">ویرایش</Button>
                    <Button variant="danger" onClick={()=>handelDelete(branch.id)}>حذف</Button>
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

export default ListBranch;
