'use client'

import React from 'react'

export interface SeeMoreButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Async callback from parent to fetch more items. */
  onFetchMore?: () => Promise<void> | void
  label?: string
  hidden?: boolean
}

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({
  onFetchMore,
  className = '',
  label = 'ดูเพิ่มเติม',
  hidden = false
}) => {
  if (hidden) {
    return null
  }
  return (
    <button
      type='button'
      className={`${className}`.trim()}
      style={{ backgroundColor: '#DBE7FE', borderRadius: '6px', padding: '2px 12px 1px' }}
      onClick={onFetchMore}
    >
      {label ?? 'ดูเพิ่มเติม'}
      <img style={{ marginLeft: '4px' }} src="/assets/icon/arrow-down.svg" alt="" />
    </button>
  )
}

export default SeeMoreButton

