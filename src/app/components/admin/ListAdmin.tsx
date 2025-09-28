import React, { useMemo } from "react";

import { Admin } from "@/types/types";

interface ListAdminTableProps {
  admin: Admin[];
  onDelete?: (id: Admin["id"]) => void;
  onEdit?: (id: Admin["id"], newData: Omit<Admin, "id">) => void;
}
const ListAdmin: React.FC<ListAdminTableProps> = ({
  admin,
  onEdit,
  onDelete,
}) => {
  const countAdmin = useMemo(() => admin.length, [admin]);
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
        </table>
      </div>
    </div>
  );
};

export default ListAdmin;
