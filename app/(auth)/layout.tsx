'use client'
import { LayoutProvider } from '../../layout/context/layoutcontext'
import { PrimeReactProvider } from 'primereact/api'
import Providers from '@/stores/providers'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import '../../styles/layout/layout.scss'

interface RootLayoutProps {
  readonly children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning style={{ fontSize: '11px' }}>
      <head>
        <link id="theme-css" href={`/themes/lara-light-blue/theme.css`} rel="stylesheet"></link>
      </head>
      <body>
        <Providers>
          <PrimeReactProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </PrimeReactProvider>
        </Providers>
      </body>
    </html>
  )
}
