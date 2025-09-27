import { Ticket } from '@/types/types'
import React, { useMemo } from 'react'

interface ListTicketTableProps{
  tickets: Ticket[],
  onEdit?: (id: Ticket["id"], newData: Omit<Ticket,"id">) => void;
  onDelete?: (id: Ticket["id"]) => void;
}
const ListTicketing:React.FC<ListTicketTableProps> = ({tickets, onEdit, onDelete}) => {

  const countTickets = useMemo(()=> tickets.length,[tickets])
  return (
    <div className='mt-4'>
      <p className='font-bold text-white mb-2'>تعداد تیکتهای ثبت شده{countTickets}</p>
    </div>
  )
}

export default ListTicketing