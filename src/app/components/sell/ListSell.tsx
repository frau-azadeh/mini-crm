import React, { useCallback, useMemo, useState } from "react";

import { Sell } from "@/types/types";

import Button from "../ui/Button";

interface ListSellTableProps {
  sells: Sell[];
  onDelete?: (id: Sell["id"]) => void;
  onEdit?:(id: Sell["id"], newData: Omit<Sell, "id">) => void
}
const ListSell: React.FC<ListSellTableProps> = ({ sells, onDelete , onEdit}) => {
  const [editingId, setEditingId] = useState<Sell["id"] | null>(null);
  const [editData, setEditData] = useState<Omit<Sell, "id"> | null>(null);

  const countSell = useMemo(() => sells.length, [sells]);

  const handleDelete = useCallback(
    (id: Sell["id"]) => {
      onDelete?.(id);
    },
    [onDelete],
  );

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editData) return;
      const name = e.currentTarget.name as keyof Omit<Sell, "id">;
      const value = e.target.value;
      setEditData((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    [editData],
  );

  const handleCancelEdit = useCallback(()=>{
    setEditingId(null)
    setEditData(null)
  },[])

  const handleStartEdit = useCallback((sell: Sell)=>{
    setEditingId(sell.id);
    setEditData({
      name:sell.name,
      quantity: sell.quantity,
      madeIn: sell.madeIn,
      sellPrice: sell.sellPrice,
      purchesPrice: sell.purchesPrice,
      description: sell.description
    })

  },[])

  const handleSaveEdit = useCallback(()=>{
    if(editingId === null || !editData) return

    onEdit?.(editingId, editData)
    setEditingId(null)
    setEditData(null)
    
  },[editData, editingId, onEdit])

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
                  {String(editingId) === String(sell.id) ? (
                    <input name="name" value={editData?.name ?? ""} 
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}/>
                  ) : (
                    <span>{sell.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {String(editingId) === String(sell.id) ? (
                    <input name="quantity" value={editData?.quantity ?? ""}
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange} />
                  ) : (
                    <span>{sell.quantity}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {String(editingId) === String(sell.id) ? (
                    <input name="madeIn" value={editData?.madeIn ?? ""}
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange} />
                  ) : (
                    <span>{sell.madeIn}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {String(editData) === String(sell.id) ? (
                    <input
                      name="purchesPrice"
                      value={editData?.purchesPrice ?? ""}
                        className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span>{sell.purchesPrice}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {String(editData) === String(sell.id) ? (
                    <input name="sellPrice" value={editData?.sellPrice ?? ""} 
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}/>
                  ) : (
                    <span>{sell.sellPrice}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                 {String(editData) === String(sell.id)?(
<input
name="description"
value={editData?.description??""}
  className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}

/>
                 ):(
                  <span>{sell.description}</span>

                 )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                 {String(editingId) === String(sell.id) ? (
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
                                         onClick={() => handleStartEdit(sell)}
                                       >
                                         ویرایش
                                       </Button>
                                       <Button
                                         variant="danger"
                                         onClick={() => handleDelete(sell.id)}
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

export default ListSell;
