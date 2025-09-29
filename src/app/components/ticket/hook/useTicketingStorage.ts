import { useCallback, useEffect, useState } from "react";

import { Ticket } from "@/types/types";

const STORAGE_KEY = "my_app_ticketing";

export function useTicketingStorage() {
  const [ticketing, setTicketing] = useState<Ticket[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Ticket[] | null;
      if (Array.isArray(parsed)) setTicketing(parsed);
    } catch (error) {
      console.error("خطا در خواندن از localStorage", error);
    }
  },[]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ticketing));
    } catch (error) {
      console.error("خطا از نوشتن در localStorage", error);
    }
  }, [ticketing]);

  const addTicketing = useCallback((newData: Ticket) => {
    setTicketing((prev) => [newData, ...prev]);
  }, []);

  const deleteTicketing = useCallback((id: Ticket["id"]) => {
    setTicketing((prev) => prev.filter((t) => String(t.id) !== String(id)));
  }, []);

  const editTicketing = useCallback(
    (id: Ticket["id"], newTicketing: Omit<Ticket, "id">) => {
      setTicketing((prev) =>
        prev.map((t) =>
          String(t.id) === String(id)
            ? {
                ...t,
                ...newTicketing,
              }
            : t,
        ),
      );
    },
    [],
  );

  return { ticketing, addTicketing, deleteTicketing, editTicketing };
}
