import { useState, useEffect } from 'react'

export const useLoadingState = (loadingProps?: boolean, timeout?: number) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (!loadingProps) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, timeout ?? 400)
      return () => clearTimeout(timer)
    }
  }, [loadingProps, timeout])

  return isLoading
}
