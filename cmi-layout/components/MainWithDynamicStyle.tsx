'use client'
import React from 'react'

interface MainWithDynamicStyleProps {
  primaryColor?: string
  secondaryColor?: string
  children: React.ReactNode
}

const MainWithDynamicStyle = ({ primaryColor, secondaryColor, children }: MainWithDynamicStyleProps) => {
  return (
    <main
      style={{
        ['--primary' as string]: primaryColor ? `#${primaryColor}` : undefined,
        ['--bg-active' as string]: secondaryColor ? `#${secondaryColor}` : undefined,
      }}
    >
      {children}
    </main>
  )
}

export default MainWithDynamicStyle
