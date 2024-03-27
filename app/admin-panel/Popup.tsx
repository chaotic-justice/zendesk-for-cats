import { createClient } from "@/utils/supabase/client"
import { TicketStatus } from "./EditButton"
import { useRouter } from "next/navigation"

type Props = {
  onClose: () => void
  ticketId: number
  status: TicketStatus
}

const Popup = ({ onClose, ticketId, status }: Props) => {
  const router = useRouter()

  const resolveTicket = async (formData: FormData) => {
    const newStatus = formData.get("option") as string
    const supabase = createClient()

    const { error } = await supabase.from("tickets").update({ status: newStatus }).eq("id", ticketId).select()
    // if newStatus is equal to old status, do nothing
    if (status === newStatus) return onClose()
    if (error) {
      console.log("error", error)
    }
    router.refresh()
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-lg bg-white p-8 shadow-2xl">
        <form>
          <h2 className="text-lg font-bold">Are you sure you want to do that?</h2>
          <p className="mt-2 text-sm text-gray-500">Some cats are docile; some cats are more vocal.</p>

          <div className="mt-4 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <label htmlFor="Option1" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabIndex={0}>
                <input className="sr-only" value="new" id="Option1" type="radio" tabIndex={-1} name="option" />
                <span className="text-sm"> new </span>
              </label>
            </div>

            <div>
              <label htmlFor="Option2" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabIndex={0}>
                <input className="sr-only" id="Option2" type="radio" tabIndex={-1} value="in progress" name="option" />
                <span className="text-sm"> in progress </span>
              </label>
            </div>

            <div>
              <label htmlFor="Option3" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabIndex={0}>
                <input className="sr-only" id="Option3" type="radio" tabIndex={-1} value="resolved" name="option" />
                <span className="text-sm"> resolved </span>
              </label>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button type="submit" formAction={resolveTicket} className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
              Yes, I'm sure
            </button>
            <button onClick={onClose} className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
              No, go back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Popup
