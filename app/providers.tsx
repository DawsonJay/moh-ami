'use client'

import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client/react'
import { store } from '@/store/store'
import { apolloClient } from '@/lib/apollo-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </Provider>
  )
}

