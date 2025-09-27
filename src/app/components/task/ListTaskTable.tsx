import React, { useMemo } from 'react'
import { Task } from '@/types/types'
interface ListTaskTableProps {
  tasks: Task[]
}

const ListTaskTable:React.FC<ListTaskTableProps> = ({tasks}) => {
  const countTask = useMemo(()=> tasks.length,[tasks])
  return (
    <div className='mt-4'>
      <span className='font-bold text-gray-800 mb-2'>تعداد تسکها : {countTask}</span>
      
      <div className='overflow-x-auto border rounded-md'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">#</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">تسک</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">عملیات</th>
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-100'>
            {tasks.map((task,index)=>(
              <tr key={task.id}>
                <td className="px-4 py-3 text-right text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-3 text-right text-sm text-gray-700 w-full">
{task.text}</td>
              </tr>
            ))}
{tasks.length === 0 &&(
  <tr>
    <td colSpan={3} className='text-center text-gray-500 px-4 py-6'>
        <p>هیچ تسکی وجود ندارد</p>
    </td>
  </tr>
)}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ListTaskTable