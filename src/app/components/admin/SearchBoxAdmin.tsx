import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Admin } from "@/types/types";

type SearchBoxAdminProps = {
  items: Admin[];
  value: string;
  onChange: (v: string) => void;
  fields?: Array<keyof Pick<Admin, "name" | "family">>;
  placeholder?: string;
  debounceMs?: number;
};

const SearchBoxAdmin: React.FC<SearchBoxAdminProps> = ({
  value,
  items,
  onChange,
  placeholder = "جستجو ...",
  fields = ["name", "family"],
  debounceMs = 200,
}) => {

    const rootRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [local, setLocal] = useState<string>(value)
    const [suggests, setSuggests] = useState<string[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [active, setActive] = useState<number>(-1)
    
    const timeRef = useRef <ReturnType<typeof setTimeout>> (null)
    const lastSentRef = useRef <string | null> (null)

    const flatValues = useMemo(()=>{
        return items
            .flatMap(
                (it)=>
                    fields
                .map((f)=>it[f])
                .filter((v)=> v!== undefined && v !== null)
                .map(String)
            )
            .filter((v, i, arr)=> arr.indexOf(v)=== i)

    },[items, fields])

    const computeSuggestions = useCallback(
        (q: string) => {
            const t = q.trim().toLowerCase()
            if(!t) return[]

            return flatValues.filter((s)=>s.toLowerCase().includes(t)).slice(0,10)
     
    },[flatValues])

useEffect(()=>{
  if(timeRef.current) clearTimeout(timeRef.current)
    timeRef.current = setTimeout(()=>{
      const next = computeSuggestions(local)
      setSuggests(next)
      setActive((prev)=>
        prev >= 0 && prev< next.length ? prev: next.length> 0? 0 :-1
      )
      setOpen(next.length>0)
      if(lastSentRef.current !== local)
        lastSentRef.current = local
      onChange(local)

    }, debounceMs)
    return()=>{
      if(timeRef.current) clearTimeout(timeRef.current)
    }
},[local, onChange, debounceMs, computeSuggestions])

const apply = (s: string) =>{
  if(timeRef.current) clearTimeout(timeRef.current)
    setLocal(s)
    lastSentRef.current = s
    onChange(s)
    setOpen(false)
    setActive(-1)
    inputRef.current?.focus()
}

const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
  if(e.key === "ArrowDown"){
    e.preventDefault();
    if(!open && suggests.length>0){
      setOpen(true)
      setActive(0)
         }else{
          setActive((a)=> Math.min(a+1, suggests.length-1))
         }
  }else if(e.key === "ArrowUp"){
    e.preventDefault()
    setActive((a)=>Math.max(a-1,0))
  }
  else if(e.key === "Enter"){
    if(active >= 0 && active< suggests.length){
      e.preventDefault()
      apply(suggests[active])
    }
  }
    else if (e.key === "Escape"){
      if(timeRef.current) clearTimeout(timeRef.current)
        setOpen(false)
      setActive(-1)
      inputRef.current?.blur()
    }

  }

const handleClear = () =>{
  if(timeRef.current) clearTimeout(timeRef.current)
    setLocal("")
  lastSentRef.current = ""
  onChange ("")
  setSuggests([])
  setOpen(false)
  setActive(-1)
  inputRef.current?.focus()
}


  return (
    <div ref={rootRef} className="relative mt-4">
      <input
        value={local}
        onChange={(e)=> setLocal(e.target.value)}
        ref={inputRef}
        placeholder={placeholder}
        type="text"
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400" // 🔹 استایل با Tailwind
        onFocus={()=>{
          const next = computeSuggestions(local)
          setSuggests(next)
          setActive(next.length > 0? 0:-1)
          setOpen(next.length>0)
        }}
        onKeyDown={onKeyDown}
      />

      <button
      onClick={handleClear}
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm" // 🔹 استایل با Tailwind
      >
        ✕
      </button>
      {open && setSuggests.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-auto z-50">
          {suggests.map((s,i)=>(
            <li key={`${s}-${i}`}
                          className={`px-3 py-2 text-sm cursor-pointer ${i === active ? "bg-indigo-50" : "hover:bg-gray-100"}`} // 🔹 استایل آیتم فعال و هاور

            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBoxAdmin;
