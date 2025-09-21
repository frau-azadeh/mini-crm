import React, { useMemo } from "react";

import type { Task } from "../../types/types";

interface ListTaskProps {
  tasks: Task[];
}
const ListTask: React.FC<ListTaskProps> = ({ tasks }) => {
  const label = useMemo(() => {
    return `تعداد تسکها: ${tasks.length}`;
  }, [tasks]);

  return (
    <div className="mt-4">
      <p className="font-bold text-gray-800">{label}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="text-gray-700">
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTask;
