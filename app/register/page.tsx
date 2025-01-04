import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <div className="grid h-screen grid-cols-1 p-3 md:grid-cols-2 lg:grid-cols-5">
         
         <div className="col-span-3 hidden lg:grid place-items-center rounded-2xl bg-neutral-800">
            <Image src="/images/logo-box.svg" alt="logo" width={430} height={430}   className="pointer-events-none" draggable="false" />
         </div>
    </div>
  )
}

export default page