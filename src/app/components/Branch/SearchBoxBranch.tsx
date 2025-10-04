import { Branch } from '@/types/types'
import React, { useRef } from 'react'

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

    const rootRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const timeTef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastSentRef = useRef<string | null>(null)

  return (
    <div>SearchBoxBranch</div>
  )
}

export default SearchBoxBranch