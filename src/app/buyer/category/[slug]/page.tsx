import CategoryProducts from '@/components/CategoryProducts/CategoryProducts'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <CategoryProducts params={params.slug} />
  )
}

export default page