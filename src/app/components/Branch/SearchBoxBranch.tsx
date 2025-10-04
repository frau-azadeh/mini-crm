import { Branch } from '@/types/types'
import React from 'react'

interface BranchSearchProps{
    items: Branch[]
    value: string;
    onChange: (v: string) => void;
    fields?: Array<keyof Pick<Branch, "city" | "status">>
    placeholder?: string;
    debounceMs?: number
}

const SearchBoxBranch:React.FC<BranchSearchProps> = ({
    value,
    onChange,
    items,
    fields = ["city", "status"],
    placeholder = "جستجو ... ",
    debounceMs = 200
}) => {

    
  return (
    <div>SearchBoxBranch</div>
  )
}

export default SearchBoxBranch