import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query"
import BackButton from "@/components/buttons/BackButton"
import TableComponent from "./table"
import { createClient } from "@/utils/supabase/server"
import { fetchTickets } from "@/utils/queries"
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { redirect } from "next/navigation"

export default async function Page() {
  const queryClient = new QueryClient()
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  await prefetchQuery(queryClient, fetchTickets(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col space-y-16 items-center justify-center h-screen">
        <BackButton />
        <div className="py-6 font-bold bg-purple-400 w-full text-center">This is a protected page that you can only see as an authenticated user</div>
        <div className="mb-2 sm:mb-10">
          <h2 className="text-2xl lg:text-3xl mx-auto max-w-xl text-center">Tickets Queue</h2>
        </div>
        <TableComponent />
      </div>
    </HydrationBoundary>
  )
}
