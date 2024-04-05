import { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/utils/database.types"

export type TypedSupabaseClient = SupabaseClient<Database>

export type NewTicketInputs = {
  name: string
  email: string
  description: string
}

export type ResolveTicketInputs = {
  ticketId: number
  newStatus: string
}