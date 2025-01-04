import Sidebar from '@/components/SideBar'
import React from 'react'

function page({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <Sidebar>
    {children}
   </Sidebar>
  )
}

export default page