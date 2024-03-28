import { GeistSans } from "geist/font/sans"
import "./globals.css"
import ToastProvider from "@/components/ToastProvider"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Zendesk for Cats",
  description: "The fastest way to resolve a dispute.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">{children}</main>
        <ToastProvider />
      </body>
    </html>
  )
}
