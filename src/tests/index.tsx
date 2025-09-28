import * as React from 'react'
import { vi } from 'vitest'
import { RenderOptions, render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppLayout from '../layouts/AppLayout/AppLayout'


type ProvidersProps = {
  children: React.ReactNode
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

const queryClient = new QueryClient()

export const Providers:React.FC<ProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AppLayout>
      {children}
    </AppLayout>
  </QueryClientProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
