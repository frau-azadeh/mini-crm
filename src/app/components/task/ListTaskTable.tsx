import React, { useCallback, useMemo, useState } from "react";

import { Task } from "@/types/types";

import Button from "../ui/Button";

interface ListTaskTableProps {
  tasks: Task[];
  onEdit?: (id: Task["id"], newTask: string) => void;
  onDelete?: (id: Task["id"]) => void;
}

const ListTaskTable: React.FC<ListTaskTableProps> = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<Task["id"] | null>(null);
  const [editingTask, setEditingTask] = useState("");
  const countTask = useMemo(() => tasks.length, [tasks]);

  const handleStartEdit = useCallback(
    (taskId: Task["id"], currentTask: string) => {
      setEditingId(taskId);
      setEditingTask(currentTask);
    },
    [],
  );

  const handleSaveEdit = useCallback(() => {
    if (editingId === null) return;
    onEdit?.(editingId, editingTask);
    setEditingId(null);
    setEditingTask("");
  }, [editingId, editingTask, onEdit]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingTask("");
  }, []);

  const handleDelete = useCallback((id: Task["id"])=>{
    onDelete?.(id)
  },[onDelete])

  return (
    <div className="mt-4">
      <span className="font-bold text-gray-800 mb-2">
        تعداد تسکها : {countTask}
      </span>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                تسک
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 w-full">
             
                  {String(editingId) === String(task.id) ? (
                    <input
                    value={editingTask}
                    onChange={(e)=>setEditingTask(e.target.value)}
                    className="w-full border rounded px-2 text-sm"
                    />
                  ):(
                    <span>{task.text}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  {String(editingId) === String(task.id) ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button onClick={handleSaveEdit} variant="call">
                        ذخیره
                      </Button>
                      <Button variant="danger" onClick={handleCancelEdit}>
                        انصراف
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="call"
                        onClick={() => handleStartEdit(task.id, task.text)}
                      >
                        ویرایش
                      </Button>
                      <Button variant="danger"
                        onClick={()=>handleDelete(task.id)}
                      >حذف</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 px-4 py-6">
                  <p>هیچ تسکی وجود ندارد</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTaskTable;
