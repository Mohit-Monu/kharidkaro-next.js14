import EditProducts from '@/components/EditProduct/EditProduct'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <EditProducts params={params}/>
  )
}

export default page