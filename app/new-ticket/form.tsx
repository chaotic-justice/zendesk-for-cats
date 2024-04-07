"use client"

import { SubmitButton } from "@/components/buttons/SubmitButton"
import { createTicket } from "@/utils/actions"
import { Bounce, toast } from "react-toastify"
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { QueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { fetchTickets } from "../../utils/queries"
import { useRouter } from "next/navigation"

const Form = () => {
  const queryClient = new QueryClient()
  const supabase = createClient()
  const router = useRouter()

  const submitHandler = async (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const description = formData.get("description") as string

    const { pgError, pgStatus } = await createTicket({ name, email, description })
    if (!pgError) {
      if (pgStatus === 201 || pgStatus === 204) {
        toast.success("Submitted!", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      }
      await prefetchQuery(queryClient, fetchTickets(supabase))
      router.refresh()
    } else {
      toast.error(`Unknown pgError:, ${pgError!.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
  }

  return (
    <form className="space-y-4">
      <div>
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input className="w-full border rounded-lg border-gray-200 p-3 text-sm" placeholder="Name" type="text" name="name" id="name" required />
      </div>
      <div>
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input className="w-full border rounded-lg border-gray-200 p-3 text-sm" placeholder="Email address" type="email" name="email" required />
      </div>

      <div>
        <label className="sr-only" htmlFor="description">
          Description
        </label>

        <textarea className="w-full border rounded-lg border-gray-200 p-3 text-sm" placeholder="Description" rows={8} name="description" id="description" required></textarea>
      </div>

      <div className="flex mt-4 justify-center">
        <SubmitButton formAction={submitHandler} className="rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto" pendingText="Submitting..">
          Submit
        </SubmitButton>
      </div>
    </form>
  )
}

export default Form
