'use client'
import React from 'react'
import { Layout, theme } from 'antd'
import Link from 'next/link'
import '@ant-design/v5-patch-for-react-19'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Logo from './Logo/Logo'


const { Header, Content, Footer } = Layout

const queryClient = new QueryClient()

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header className="flex items-center">
          <Link className="flex items-center gap-4" href="/">
            <Logo />
            <div className="text-lg font-semibold text-white uppercase">
              [ Persons ]
            </div>
          </Link>
        </Header>
        <Content
          className="!min-h-[calc(100vh-133px)] p-8"
        >
          <div
            className="min-h-[calc(100vh-197px)] p-8 flex flex-col items-between"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Test assignment
        </Footer>
      </Layout>
    </QueryClientProvider>
  )
}

export default AppLayout
