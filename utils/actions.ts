"use server"

import { createClient } from "./supabase/server"
import { NewTicketInputs, ResolveTicketInputs } from "./types"

export const createTicket = async ({ name, email, description }: NewTicketInputs) => {
  const supabase = createClient()

  const { error: pgError, status: pgStatus } = await supabase.from("tickets").insert({
    name,
    email,
    description,
  })

  return { pgError, pgStatus }
}

export const resolveTicket = async ({ ticketId, newStatus }: ResolveTicketInputs) => {
  const supabase = createClient()
  const { error: pgError, status: pgStatus } = await supabase.from("tickets").update({ status: newStatus }).eq("id", ticketId).select()
  console.log("pgStatus from resolving..", pgStatus)
  return { pgError, pgStatus }
}
