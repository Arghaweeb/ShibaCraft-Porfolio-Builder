import Spinner from '@/components/ui/spinner'
import React from 'react'

function Loading() {
  return (
    <div className='h-40 flex justify-center items-center'>
        <Spinner />
    </div>
  )
}

export default Loading