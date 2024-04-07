"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { resolveTicket } from "@/utils/actions"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Bounce, toast } from "react-toastify"

type Props = {
  ticketId: number
  oldStatus: string
}

export function DialogForm({ ticketId, oldStatus }: Props) {
  const mutation = useMutation({
    mutationFn: resolveTicket,
    onSuccess: async (result, variables, context) => {
      // Replace optimistic todo in the todos list with the result
      console.log("result", result)
      const { pgError, pgStatus } = result
      if (pgError) {
        console.log("error", pgError)
        return
      }

      const toastedMessage = `${variables.newStatus === "resolved" ? "Resolved! " : "Updated!"} ${result.message}`
      if (pgStatus === 201 || pgStatus === 200) {
        toast.success(toastedMessage, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
        setOpen(false)
        router.refresh()
      }
    },
  })

  const [open, setOpen] = useState(false)
  const router = useRouter()

  const submitHandler = async (formData: FormData) => {
    const newStatus = formData.get("statusOption") as string
    // no need to do anything w/ message on the backend
    // simplify log it via toastify alert
    const message = formData.get("message") as string

    // if newStatus is equal to old status, do nothing
    if (oldStatus === newStatus) {
      setOpen(false)
      return
    }

    mutation.mutate({ ticketId, newStatus, message })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-700">Resolve</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Are you sure you want to do that?</DialogTitle>
            <DialogDescription>Some cats are docile; some cats are more vocal.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <label htmlFor="Option1" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabIndex={0}>
                <input className="sr-only" value="new" id="Option1" type="radio" tabIndex={-1} name="statusOption" required />
                <span className="text-sm"> new </span>
              </label>
            </div>

            <div>
              <label htmlFor="Option2" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabIndex={0}>
                <input className="sr-only" id="Option2" type="radio" tabIndex={-1} value="in progress" name="statusOption" />
                <span className="text-sm"> in progress </span>
              </label>
            </div>

            <div>
              <label htmlFor="Option3" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabIndex={0}>
                <input className="sr-only" id="Option3" type="radio" tabIndex={-1} value="resolved" name="statusOption" />
                <span className="text-sm"> resolved </span>
              </label>
            </div>
          </div>

          <div className="mt-2">
            <textarea className="mt-2 w-full p-1 rounded-lg border-gray-200 align-top shadow-sm sm:text-sm" rows={4} name="message" placeholder="Leave a message..."></textarea>
          </div>

          <DialogFooter>
            <div className="mt-4 flex gap-2">
              <button type="submit" formAction={submitHandler} className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                Yes, I'm sure
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                }}
                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
              >
                No, go back
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
