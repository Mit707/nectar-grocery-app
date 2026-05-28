import { useState, useEffect, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useSimulatedFetch<T>(
  fetchFn: () => T,
  delay: number = 600,
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const timer = setTimeout(() => {
      try {
        setData(fetchFn())
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, trigger]) // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => setTrigger((t) => t + 1), [])

  return { data, loading, error, refetch }
}
