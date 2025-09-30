import { Branch } from '@/types/types'
import React, { useMemo, useRef, useState } from 'react'

type BranchesSearchProps = {
    items: Branch[]
    value: string
    onChange: (v: string) => void
    placeholder?: string
    debounceMs?: number
    fields?: Array <keyof Pick<Branch, "city" | "status">>
}
const SearchBoxBranch:React.FC<BranchesSearchProps> = ({
    items,
    value,
    onChange,
    placeholder = "جستجو ...",
    debounceMs = 200,
    fields = ["city", "status"]
}) => {

    const rootRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const lastSentRef = useRef<string | null>(null)

    const [local, setLocal] = useState<string>(value)
    const [suggests, setSuggests] = useState <string[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [active, setActive] = useState<number>(-1)

    const flatValues = useMemo (()=>{
        return items
            .flatMap(
                (it)=>
                     fields
                     .map((f) => it[f])
                    .filter((v) => v !== undefined && v!== null)
                    .map(String)
            )
            .filter((v, i, arr)=> arr.indexOf(v)=== i)
    }, [items, fields])

  return (
    <div ref={rootRef}>
        <input ref={inputRef}/>
    </div>
  )
}

export default SearchBoxBranch