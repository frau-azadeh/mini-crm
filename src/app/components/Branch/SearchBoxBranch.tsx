import { Branch } from '@/types/types'
import React from 'react'

type BranchesSearchProps = {
    items: Branch[]
    value: string
    onChange: (v: string) => void
    placeholder?: string
    debounceMs?: number
    field?: Array <keyof Pick<Branch, "city" | "status">>
}
const SearchBoxBranch:React.FC<BranchesSearchProps> = ({
    items,
    value,
    onChange,
    placeholder = "جستجو ...",
    debounceMs = 200,
    field = ["city", "status"]
}) => {
  return (
    <div>SearchBoxBranch</div>
  )
}

export default SearchBoxBranch