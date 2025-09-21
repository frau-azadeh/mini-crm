"use client"

import React, { useCallback, useMemo, useState } from 'react'
import Button from './ui/Button'

type Task = {
  id: string; 
  text: string;
}

const AddTask:React.FC = () => {
  const[tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState<string>("")

  const handleChange = useCallback(
    (e:React.ChangeEvent<HTMLInputElement>)=>{ setInputValue(e.target.value)
    },[])

const handleAddTask = useCallback(() => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(), // 👈 ساده‌ترین راه برای ساخت id یکتا
      text: inputValue,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  }, [inputValue]);

  const label = useMemo(()=>{
    return `تعداد تسکها: ${tasks.length}`
  },[tasks])
  return (
    <div>
      <h2 className='font-bold text-gray-800'>تسک خود را اضافه کنید:</h2>
      <input 
        value={inputValue}
        onChange={handleChange}
        placeholder='تسک جدید ...'
        className='border rounded-md p-2 w-full'
      />
      <Button
        onClick={handleAddTask} 
      >
        اضافه 
        </Button>
        <div className='mt-4'>
          <p className='font-bold text-gray-800'>{label}</p>
          <ul>
            {tasks.map((task)=>(
              <li key={task.id} className='text-gray-700'>
                {task.text}
              </li>
            ))}
          </ul>

        </div>
    </div>

  )
}

export default AddTask