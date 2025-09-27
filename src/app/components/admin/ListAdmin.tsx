import { Admin } from '@/types/types'
import React from 'react'

interface ListAdminTableProps{
    admin: Admin[];
    onDelete?: (id: Admin["id"]) => void
    onEdit?: (id: Admin["id"], newData: Omit<Admin,"id"> ) => void
}
const ListAdmin:React.FC<ListAdminTableProps> = ({admin, onEdit, onDelete}) => {
  return (
    <div>ListAdmin</div>
  )
}

export default ListAdmin