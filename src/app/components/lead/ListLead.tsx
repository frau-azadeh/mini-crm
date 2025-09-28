import { Lead } from '@/types/types'
import React, { useMemo } from 'react'
interface ListLeadTableType {
  leads : Lead[]
}

const ListLead:React.FC<ListLeadTableType> = ({leads}) => {
    const countLead= useMemo(()=>leads.length,[leads])

  return (
    <div className='mt-4'>
        <p className='font-bold text-white mb-2'>تعداد سرنخ های ثبت شده{countLead}</p>
    </div>
  )
}

export default ListLead