"use client"

import { useState } from "react"
import Popup from "./Popup"

export type TicketStatus = "new" | "in progress" | "resolved"

type Props = {
  ticketId: number
  status: TicketStatus
}

const EditButton = ({ ticketId, status }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-700">
        Resolve
      </button>
      {isModalOpen && <Popup onClose={toggleModal} ticketId={ticketId} status={status} />}
    </>
  )
}

export default EditButton
