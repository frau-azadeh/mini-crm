import { Branch } from "@/types/types"
import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "my_app_branches"

export function useBranchStorage(){
    const [branches, setBranches] = useState<Branch[]>([])
    

    useEffect(()=>{
        try {
            const row = localStorage.getItem(STORAGE_KEY);
            if(!row) return;
            const parsed = JSON.parse(row) as Branch[] | null;
            if (Array.isArray(parsed)) setBranches(parsed);
            
        } catch (error) {
            console.error("خطا خواندن در locakStorage", error)
        }

    },[])

    useEffect(()=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(branches))
        } catch (error) {
            console.error("خطا در نوشتن در localStorage", error)
        }

    },[branches])

    const addBranch = useCallback((newBranch: Branch)=>{
setBranches((prev)=>[newBranch, ...prev])
    },[])

    const deleteBranch = useCallback((id: Branch["id"])=>{
        setBranches((prev)=>prev.filter((t)=>String(t.id)!==String(id)))
    },[])

      const editBranch = useCallback(
    (id: Branch["id"], newData: Omit<Branch, "id">) => {
      setBranches((prev) =>
        prev.map((t) =>
          String(t.id) === String(id) ? { ...t, ...newData } : t,
        ),
      );
    },
    [],
  );
    return{branches, addBranch, deleteBranch, editBranch}
}