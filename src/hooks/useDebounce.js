import { useEffect, useState } from 'react'

// Custom Hook for Debouncing
export default function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer) // Reset previous timer
    }, [value, delay])

    return debouncedValue
}
