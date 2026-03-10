'use client'

import React from 'react'

export interface SeeMoreButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Async callback from parent to fetch more items. */
  onFetchMore?: () => Promise<void> | void
}

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({
  onFetchMore,
  children,
  type = 'button',
  className = '',
  ...buttonProps
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    // Preserve any external onClick
    if (buttonProps.onClick) {
      buttonProps.onClick(e)
    }
    if (e.defaultPrevented) return

    if (onFetchMore) {
      await onFetchMore()
    }
  }

  return (
    <button
      type={type}
      // className={`${styles.root} ${className}`.trim()}
      className={`${className}`.trim()}
      onClick={handleClick}
      {...buttonProps}
    >
      {children ?? 'ดูเพิ่มเติม'}
      <img src="/assets/icon/arrow-down.svg" alt="" />
    </button>
  )
}

export default SeeMoreButton

