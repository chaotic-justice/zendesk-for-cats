"use client"

import CIcon from "@coreui/icons-react"
import { cilPaw } from "@coreui/icons"

export default function PawButton() {
  return (
    <a href="https://www.instagram.com/catcafebk/" target="_blank" rel="noreferrer">
      <button className="flex h-auto items-center space-x-2 px-4 py-2 rounded-md border">
        <CIcon icon={cilPaw} />
        <span className="font-semibold">meow meow</span>
      </button>
    </a>
  )
}
