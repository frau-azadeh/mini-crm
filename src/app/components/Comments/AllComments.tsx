import { fetchAllComments } from '@/api/commentsService'
import { Comments } from '@/types/types'
import React, { useEffect, useState } from 'react'

const AllComments:React.FC = () => {
    const [comments, setComments] = useState<Comments[]>([])

    useEffect(()=>{
        fetchAllComments().then(setComments)
    },[])

  return (
    <div className='space-y-4'>
        {comments.map((c)=>(
            <div key={c.id} className="p-4 border rounded shadow">
                <h3>{c.name}</h3>
                <p>{c.body}</p>
            </div>
        ))}
    </div>
  )
}

export default AllComments