import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState, ReactNode } from 'react'

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}
