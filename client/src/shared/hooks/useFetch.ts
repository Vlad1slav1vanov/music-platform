import { useState } from 'react'

type UseFetchingReturn = [() => Promise<void>, boolean, string]

export const useFetching = (callback: () => Promise<void>): UseFetchingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetching = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await callback()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}
