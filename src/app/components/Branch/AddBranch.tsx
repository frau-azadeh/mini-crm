import { Branch } from '@/types/types'
import React, { useState } from 'react'

const AddBranch:React.FC = () => {

  const[branch, setBranch] = useState<Branch[]>([])
  const[form, setForm] = useState<Omit<Branch, "id">>({
    city:"",
    phone:"",
    address:"",
    status:""
  })
  return (
    <div className='mx-auto max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-lg rounded-xl md:p-8'>
      <h2 className='font-bold text-white text-xl md:text-2xl mb-6'>اطلاعات شعب را وارد کنید!</h2>
      <div className='bg-white rounded-lg p-6 shadow-inner'>

      </div>
    </div>
  )
}

export default AddBranch