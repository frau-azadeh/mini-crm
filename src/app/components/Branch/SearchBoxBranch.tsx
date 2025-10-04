import { Branch } from '@/types/types'
import React, { useRef, useState } from 'react'

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

    const [local, setLocal] = useState<string>(value)
    const [suggests, setSuggests] = useState<string[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [active, setActive] = useState<number>(-1)

  return (
    <div>SearchBoxBranch</div>
  )
}

export default SearchBoxBranch