import React, { useMemo, useRef, useState } from "react";

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

    

  return (
    <div ref={rootRef} className="relative mt-4">
      <input
        value={local}
        ref={inputRef}
        placeholder={placeholder}
        type="text"
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400" // 🔹 استایل با Tailwind
      />

      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm" // 🔹 استایل با Tailwind
      >
        ✕
      </button>
    </div>
  );
};

export default SearchBoxAdmin;
