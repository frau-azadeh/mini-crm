"use client"
import { Admin } from '@/types/types'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../ui/Button'

const AddAdmin:React.FC = () => {
    const [admin, setAdmin] = useState<Admin[]>([])
    const [form, setForm] = useState<Omit<Admin, "id">>({
        name:"",
        family:"",
        userName:"",
        password:""
    })

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setForm((prev)=>({...prev,[name]:value}))
    },[])

    const handleAdd = useCallback(()=>{
        if(!form.name.trim()) return

        const newAdmin : Admin ={
            id: Date.now().toString(),
            ...form
        }
        setAdmin((prev)=>[...prev,newAdmin])
        setForm({name: "", family: "", userName: "" ,password: ""})
    },[form])

    const countAdmin = useMemo(()=>admin.length,[admin])
  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl rounded-xl p-6 md:p-8">
        <h2 className='font-bold text-white text-xl md:text-2xl mb-6'>اطلاعات ادمین ها را وارد نمایید</h2>
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <span className='block text-sm text-gray-600 mb-4'>تعداد ادمین های اضافه شده : <span className='font-semibold text-slate-700'>{(countAdmin)}</span></span>
                <input
                    name='name'
                    value={form.name}
                    placeholder='نام'
                              className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
onChange={handleChange}
                />

                        <input
          name="family"
          value={form.family}
          placeholder="نام خانوادگی"
          className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
        />

        <input
            name='userName'
            value={form.userName}
            placeholder='نام کاربری'
             className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
        />

        <input
        name='password'
        value={form.password}
        placeholder='پسورد'
        type='password'
             className="border border-gray-300 rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          onChange={handleChange}
        />
        <Button
            onClick={handleAdd}
        >افزودن ادمین</Button>
             
              </div>

    </div>
  )
}

export default AddAdmin