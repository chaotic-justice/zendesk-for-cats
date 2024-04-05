import ToastProvider from "@/components/ToastProvider"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import React, { type ReactNode } from "react"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Zendesk for Cats",
  description: "The fastest way to resolve a dispute.",
}

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">{children}</main>
        {modal}
        <ToastProvider />
      </body>
    </html>
  )
}
