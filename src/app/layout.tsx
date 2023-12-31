import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'arweave asset viewer',
  description: 'View atomic assets on ArWeave',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><ApolloWrapper>{children}</ApolloWrapper></body>
    </html>
  )
}
