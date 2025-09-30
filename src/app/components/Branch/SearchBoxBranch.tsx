import { Branch } from '@/types/types'
import React, { useRef } from 'react'

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

    const rootRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  return (
    <div ref={rootRef}>
        <input ref={inputRef}/>
    </div>
  )
}

export default SearchBoxBranch