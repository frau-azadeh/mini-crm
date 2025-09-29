import { Sell } from "@/types/types"
import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "my_app_sell"

export function useSellStorage(){
    
    const[sells, setSells] = useState<Sell[]>([])

    useEffect(()=>{
        try {
            const row = localStorage.getItem(STORAGE_KEY)
            if(!row) return
            const parsed = JSON.parse(row) as Sell[] | null
            if(Array.isArray(parsed)) setSells(parsed)
            
        } catch (error) {
            console.error("خطا در خواندن در localStorage", error)
        }
    },[])

    useEffect(()=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sells))
        } catch (error) {
            console.error("خطا در نوشتن در localStorage", error)
        }
    },[])

    const addSell = useCallback((newSell: Sell)=>{
        setSells((prev)=>[newSell,...prev])
    },[])

    const editSell = useCallback((id: Sell["id"], newData: Omit<Sell, "id">)=>{
        setSells((prev)=>prev.map((t)=>
        String(t.id) === String(id)?
        {...t, ...newData}:t
        ))
    },[])

    return{sells, addSell, editSell}
}