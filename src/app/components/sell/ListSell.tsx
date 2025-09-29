import React, { useCallback, useMemo } from "react";

import { Sell } from "@/types/types";

import Button from "../ui/Button";

interface ListSellTableProps {
  sells: Sell[];
  onDelete?: (id: Sell["id"]) => void
}
const ListSell: React.FC<ListSellTableProps> = ({ sells, onDelete }) => {
  const countSell = useMemo(() => sells.length, [sells]);

  const handleDelete = useCallback((id: Sell["id"])=>{
    onDelete?.(id)
  },[onDelete])


  return (
    <div className="mt-4">
      <p className="font-bold text-white mb-2">
        تعداد محصولات ثبت شده{countSell}
      </p>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                نام محصول
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                تعداد
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                ساخت
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                قیمت فروش
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                قیمت خرید
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                شرح
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sells.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  <p>هیچ محصولی ثبت نشده</p>
                </td>
              </tr>
            )}
            {sells.map((sell, index) => (
              <tr key={sell.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <span>{sell.name}</span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <span>{sell.quantity}</span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <span>{sell.madeIn}</span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <span>{sell.purchesPrice}</span>{" "}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <span>{sell.sellPrice}</span>{" "}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <span>{sell.description}</span>{" "}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="call">ویرایش</Button>
                    <Button variant="danger" onClick={()=>handleDelete(sell.id)}>حذف</Button>
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

export default ListSell;
