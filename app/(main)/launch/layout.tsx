'use client'

import useLoading from '@/helpers/hooks/useLoading'
import Loading from '@/cmi-layout/components/Loading'

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
