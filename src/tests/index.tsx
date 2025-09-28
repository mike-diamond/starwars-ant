import * as React from 'react'
import { mainnet } from 'wagmi/chains'
import { RenderOptions, render } from '@testing-library/react'
import { default as userEvent } from '@testing-library/user-event'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { mock } from 'wagmi/connectors'
import AppLayout from '../layouts/AppLayout/AppLayout'


const mockAddress = '0xd007058e9b58E74C33c6bF6fbCd38BaAB813cBB6'

const mockConnector = (config: Parameters<ReturnType<typeof mock>>[0]) => {
  const connector = mock({
    accounts: [ mockAddress ]
  })(config)

  // @ts-ignore
  connector.rkDetails = {
    id: 'mock',
    name: 'Mock wallet',
    rdns: 'io.mock',
    iconBackground: "#8697FF",
    installed: true,
    groupName: 'Recommended',
    isRainbowKitConnector: true
  }

  return connector
}

export function setupConfig() {
  return createConfig({
    chains: [
      mainnet,
    ],
    connectors: [
      mockConnector,
    ],
    transports: {
      [mainnet.id]: http(),
    },
  })
}

type ProvidersProps = {
  children: React.ReactNode
}

const appInfo = { appName: 'Test app' }
const queryClient = new QueryClient()
const config = setupConfig()

export function Providers({ children }: ProvidersProps) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={appInfo}
          theme={lightTheme()}
          locale="en-US"
        >
          <AppLayout>
            {children}
          </AppLayout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }

export type UserEvent = ReturnType<typeof userEvent.setup>
export { default as userEvent } from '@testing-library/user-event'

export { mockAddress }
