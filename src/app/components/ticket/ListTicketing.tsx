import React, { useMemo } from "react";

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
  const countTickets = useMemo(() => tickets.length, [tickets]);
  return (
    <div className="mt-4">
      <p className="font-bold text-white mb-2">
        تعداد تیکتهای ثبت شده{countTickets}
      </p>
      <div>
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
                    {ticket.title}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 w-full">
                    {ticket.description}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="call">ویرایش</Button>
                      <Button variant="danger">حذف</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTicketing;
