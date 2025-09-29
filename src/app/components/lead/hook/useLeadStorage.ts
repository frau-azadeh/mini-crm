import { useCallback, useEffect, useState } from "react";

import { Lead } from "@/types/types";

const STORAGE_KEY = "my_app_lead";

export function useLeadStorage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if(!raw) return
        const parsed = JSON.parse(raw) as Lead[] | null
        if(Array.isArray(parsed)) setLeads(parsed)
    } catch (error) {
      console.error("خطا در خواندن در localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
    } catch (error) {
      console.error("خطا در نوشتن در localStorage", error);
    }
  }, [leads]);

  const addLead = useCallback((newLeads: Lead)=>{
    setLeads((prev)=>[newLeads, ...prev])
  },[])

  const deleteLead = useCallback((id: Lead["id"])=>{
    setLeads((prev)=>prev.filter((t)=>String(t.id)!==String(id)))
  },[])

  const handleEdit = useCallback((id: Lead["id"], newData: Omit<Lead, "id"> )=>{
    setLeads((prev)=>prev.map((t)=>
    String(t.id) === String(id) ? {...t, ...newData} : t
    ))
  },[])

  return { leads, addLead, deleteLead, handleEdit };
}
