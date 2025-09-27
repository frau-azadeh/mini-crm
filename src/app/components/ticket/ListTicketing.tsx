import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

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

  const handleDelete = useCallback(
    (id: Ticket["id"]) => {
      onDelete?.(id);
    },
    [onDelete],
  );
  const countTickets = useMemo(() => tickets.length, [tickets]);

  const handleFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!editData) return;
      const name = e.currentTarget.name as keyof Omit<Ticket, "id">;
      const value = e.currentTarget.value;
      setEditData({ ...editData, [name]: value });
    },
    [editData],
  );

  const handleStartEdit = useCallback((ticket: Ticket) => {
    setEditingId(ticket.id);
    setEditData({ title: ticket.title, description: ticket.description });
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
        تعداد تیکتهای ثبت شده{countTickets}
      </p>
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
                  <p>هیچ تیکتی ثبت نشده </p>
                </td>
              </tr>
            )}
            {tickets.map((ticket, index) => (
              <tr key={ticket.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {index + 1}
                </td>

                <td className="px-4 py-3 text-right text-sm text-gray-700 w-full">
                  {String(editingId) === String(ticket.id) ? (
                    <input
                      name="title"
                      value={editData?.title ?? ""}
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span>{ticket.title}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600 w-1/2">
                  {String(editingId) === String(ticket.id) ? (
                    <textarea
                      value={editData?.description ?? ""}
                      name="description"
                      className="w-full border rounded px-2 py-1 text-sm"
                      onChange={handleFieldChange}
                      rows={3}
                    />
                  ) : (
                    <span className="block text-sm text-gray-700 whitespace-pre-wrap">
                      {ticket.description}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  {String(editingId) === String(ticket.id) ? (
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
                        onClick={() => handleStartEdit(ticket)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(ticket.id)}
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

export default ListTicketing;
