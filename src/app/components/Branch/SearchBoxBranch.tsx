import { Branch } from '@/types/types'
import React from 'react'

interface BranchesSearchProps{
    items: Branch[]
}
const SearchBoxBranch:React.FC<BranchesSearchProps> = ({items}) => {
  return (
    <div>SearchBoxBranch</div>
  )
}

export default SearchBoxBranch