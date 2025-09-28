import { Branch } from '@/types/types'
import React, { useMemo } from 'react'

interface ListBranchTableProps{
    branches :Branch[],

}
const ListBranch:React.FC<ListBranchTableProps> = ({branches}) => {

    const countBranches = useMemo(()=>branches.length,[branches])
  return (
    <div className='mt-4'>
        <p className='text-white'>تعداد شعب ثبت شده{countBranches}</p>
    </div>
  )
}

export default ListBranch