"use client"

import { useRouter } from "next/navigation"

const CloseButton = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => {
        router.back()
      }}
      className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
    >
      No, go back
    </button>
  )
}

export default CloseButton
