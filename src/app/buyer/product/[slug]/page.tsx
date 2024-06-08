import ShowSingleProduct from '@/components/ShowSingleProduct/ShowSingleProduct'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <ShowSingleProduct params={params.slug} />
  )
}

export default page