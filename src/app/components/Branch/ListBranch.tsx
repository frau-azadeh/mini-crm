import React, { useCallback, useMemo, useState } from "react";

import { Branch } from "@/types/types";

import Button from "../ui/Button";

interface ListBranchTableProps {
  branches: Branch[];
  onDelete?: (id: Branch["id"]) => void;
  onEdit?:(id: Branch["id"], newData: Omit<Branch,"id">)=> void
}
const ListBranch: React.FC<ListBranchTableProps> = ({ branches, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<Branch["id"] | null>(null);
  const [editData, setEditData] = useState<Omit<Branch, "id"> | null>(null);

  const countBranches = useMemo(() => branches.length, [branches]);

  const handelDelete = useCallback(
    (id: Branch["id"]) => {
      onDelete?.(id);
    },
    [onDelete],
  );

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editData) return;
      const name = e.currentTarget.name as keyof Omit<Branch, "id">;
      const value = e.currentTarget.value;
      setEditData((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    [editData],
  );

  const handleCancelEdit = useCallback(()=>{
    setEditData(null)
    setEditingId(null)
  },[])

  const handleStartEdit = useCallback((branch: Branch)=>{
    setEditingId(branch.id)
    setEditData({
      city: branch.city,
      address: branch.address,
      phone:branch.phone,
      status: branch.status
    })
  },[])

  const handleSaveEdit = useCallback(()=>{
    if(!editData || editingId=== null) return

    onEdit?.(editingId, editData)
    setEditingId(null)
    setEditData(null)
  },[editData, editingId, onEdit])

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
                   {String(editingId) === String(branch.id)?(
                    <input
                      name="city"
                      value={editData?.city??""}
                      onChange={handleFieldChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  ):(
                    <span>{branch.city}</span>
                  )}

                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editData)=== String(branch.id)?(
                    <input
                      name="address"
                      value={editData?.address??""}
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}
                    />
                  ):(
                    <span>{branch.address}</span>
                  )}
                  
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editData) === String(branch.id)?(
                    <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    name="phone"
                    value={editData?.phone}
                    onChange={handleFieldChange}
                    />
                  ):(
                    <span>{branch.phone}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editData)=== String(branch.id)?(
                    <input
                      className="w-full border rounded px-2 py-1 text-sm"
                      name="status"
                      value={editData?.status??""}
                      onChange={handleFieldChange}
                    />
                  ):(
                    <span>{branch.status}</span>
                  )}
                  
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 ">
                  {String(editData)=== String(branch.id)?(
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="call" onClick={handleSaveEdit}>ذخیره</Button>
                      <Button variant="danger" onClick={handleCancelEdit}>انصراف</Button>
</div>
                  ):(
                  <div className="flex gap-2 items-center justify-center">
                    <Button variant="call" onClick={()=>handleStartEdit(branch)}>ویرایش</Button>
                    <Button
                      variant="danger"
                      onClick={() => handelDelete(branch.id)}
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

export default ListBranch;
