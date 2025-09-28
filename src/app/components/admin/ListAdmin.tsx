import React, { useCallback, useMemo, useState } from "react";

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

    const [editingId, setEditingId] = useState <Admin["id"] | null>(null)
    const [editData, setEditData] = useState<Omit<Admin, "id">|null>(null)
  const countAdmin = useMemo(() => admins.length, [admins]);


  const handleDelete = useCallback((id: Admin["id"])=>{
    onDelete?.(id)
  },[onDelete])

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
            {admins.length === 0 &&(
                <tr>
                    <td colSpan={6} 
                    className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                        <p>هیچ ادمینی ثبت نشده است!</p>
                    </td>
                </tr>
            )}
            {admins.map((admin, index)=>(
                <tr key={admin.id}>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 ">{index+1}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700">{admin.name}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 ">{admin.family}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 ">{admin.userName}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 ">{admin.password}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                        <div className="flex items-center gap-2 justify-center">
                            <Button variant="call">ویرایش</Button>
                            <Button variant="danger" onClick={()=>handleDelete(admin.id)}>حذف</Button>
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

export default ListAdmin;
