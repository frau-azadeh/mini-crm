import { Admin } from '@/types/types'
import React from 'react'

type SearchBoxAdminProps ={
    items: Admin[]
    value: string;
    onChange: (v:string) => void
    fields?: Array<keyof Pick<Admin,"name"|"family">>
    placeholder?: string
    debounceMs?: number

}


const SearchBoxAdmin:React.FC<SearchBoxAdminProps> = ({
    value,
    items,
    onChange,
    placeholder = "جستجو ...",
    fields = ["name", "family"],
    debounceMs = 200,
}) => {
  return (
    <div className='relative mt-4'>
        <input
            type='text'
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400" // 🔹 استایل با Tailwind
        />

       <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm" // 🔹 استایل با Tailwind
      >
        ✕
      </button>
    </div>
  )
}

export default SearchBoxAdmin