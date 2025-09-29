import { Sell } from "@/types/types"
import { useEffect, useState } from "react"

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

    return{sells}
}