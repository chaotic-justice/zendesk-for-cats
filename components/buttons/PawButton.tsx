"use client"

import CIcon from "@coreui/icons-react"
import { cilPaw } from "@coreui/icons"
import Link from "next/link"

export const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export default function PawButton() {
  return (
    <Link href={defaultUrl}>
      <button className="flex h-auto items-center space-x-2 px-4 py-2 rounded-md border">
        <CIcon icon={cilPaw} />
        <span className="font-semibold">meow meow</span>
      </button>
    </Link>
  )
}
