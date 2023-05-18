"use client"

import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const Login: NextPage = () => {
  const { data: session } = useSession()
  if (session && session.user) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
      </>
    )
  }
  return (
    <>
      Not signed in <br />
    </>
  )


}

export default Login