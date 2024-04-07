import { TypedSupabaseClient } from "./types"

export const fetchTickets = (supabase: TypedSupabaseClient) => {
  return supabase.from("tickets").select()
}
