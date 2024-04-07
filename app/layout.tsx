import ToastProvider from "@/components/ToastProvider"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import React, { type ReactNode } from "react"
import { Providers } from "./providers"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Zendesk for Cats",
  description: "The fastest way to resolve a dispute.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  )
}
