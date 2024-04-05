"use client"

import { useRouter } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

const page = ({ params }: Props) => {
  const router = useRouter()
  if (params.id) {
    router.replace("/admin-table")
  }

  return undefined
}

export default page
