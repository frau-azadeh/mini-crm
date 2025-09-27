import React, { useCallback, useMemo, useState } from "react";

import { Ticket } from "@/types/types";

import Button from "../ui/Button";

interface ListTicketTableProps {
  tickets: Ticket[];
  onEdit?: (id: Ticket["id"], newData: Omit<Ticket, "id">) => void;
  onDelete?: (id: Ticket["id"]) => void;
}

const ListTicketing: React.FC<ListTicketTableProps> = ({
  tickets,
  onEdit,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<Ticket["id"] | null>(null);
  const [editData, setEditData] = useState<Omit<Ticket, "id"> | null>(null);

  const handleStartEdit = useCallback((ticket: Ticket) => {
    setEditingId(ticket.id);
    setEditData({ title: ticket.title, description: ticket.description });
  }, []);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!editData) return;
      const name = e.currentTarget.name as keyof Omit<Ticket, "id">;
      const value = e.currentTarget.value;
      setEditData({ ...editData, [name]: value });
    },
    [editData],
  );

  const handleSaveEdit = useCallback(() => {
    if (editingId === null || !editData) return;
    onEdit?.(editingId, editData);
    setEditingId(null);
    setEditData(null);
  }, [editingId, editData, onEdit]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditData(null);
  }, []);

  const handleDelete = useCallback(
    (id: Ticket["id"]) => {
      onDelete?.(id);
    },
    [onDelete],
  );

  const label = useMemo(() => `تعداد تیکت‌ها: ${tickets.length}`, [tickets]);

  return (
    <div className="mt-4">
      <p className="font-bold text-gray-700 mb-2">{label}</p>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                موضوع
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
            {tickets.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  هیچ تیکتی وجود ندارد.
                </td>
              </tr>
            )}

            {tickets.map((ticket, index) => {
              const isEditing = editingId === ticket.id;

              return (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-right text-sm text-gray-600">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-right text-sm text-gray-700 w-1/3">
                    {isEditing ? (
                      <input
                        name="title"
                        value={editData?.title ?? ""}
                        onChange={handleFieldChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit();
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                        className="w-full border rounded px-2 py-1 text-sm"
                        aria-label={`ویرایش موضوع تیکت ${ticket.id}`}
                      />
                    ) : (
                      <span>{ticket.title}</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right text-sm text-gray-600 w-1/2">
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={editData?.description ?? ""}
                        onChange={handleFieldChange}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") handleCancelEdit();
                          if (e.key === "Enter" && e.ctrlKey) handleSaveEdit();
                        }}
                        rows={3}
                        className="w-full border rounded px-2 py-1 text-sm"
                        aria-label={`ویرایش شرح تیکت ${ticket.id}`}
                      />
                    ) : (
                      <span className="block text-sm text-gray-700 whitespace-pre-wrap">
                        {ticket.description}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center text-sm">
                    {isEditing ? (
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
                          onClick={() => handleStartEdit(ticket)}
                          variant="call"
                        >
                          ویرایش
                        </Button>
                        <Button
                          onClick={() => handleDelete(ticket.id)}
                          variant="danger"
                        >
                          حذف
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTicketing;
