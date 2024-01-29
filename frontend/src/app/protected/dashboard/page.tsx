import React from 'react'
import TabsEndpoints from '@/components/ui/dashboard/Endpoints'
import ScrollAreaMsg from '@/components/ui/dashboard/MyMessages'
import Link from 'next/link'

function page() {
  return (
    <div className='flex flex-col md:flex-row gap-4 items-center md:items-start'>
      <TabsEndpoints />
      <ScrollAreaMsg />
      <Link
          href="/protected/dashboard/chat"
          className="h-fit  group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Chatrooms{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Send messages now!
          </p>
        </Link>
    </div>
  )
}

export default page