import { useEffect, useState } from 'react'

export const useDebounce = (val: string, delay: number) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(val)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [val, delay])

  return value
}
