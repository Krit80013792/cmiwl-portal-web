'use client'

import useLoading from '@/helpers/hooks/useLoading'
import Loading from '../loading'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useLoading()
  return (
    <>
      {!loading.isHidden && <Loading />}
      {children}
    </>
  )
}

export default Layout
