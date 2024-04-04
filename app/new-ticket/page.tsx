import BackButton from "@/components/BackButton"
import { SubmitButton } from "@/components/SubmitButton"
import { createClient } from "@/utils/supabase/server"
import { Bounce, toast } from "react-toastify"

export default function NewTicket() {
  const createTicket = async (formData: FormData) => {
    "use server"

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const description = formData.get("description") as string
    const supabase = createClient()

    const { error } = await supabase.from("tickets").insert({
      name,
      email,
      description,
    })

    if (error) {
      toast.error(`Unknown error:, ${error.message}`, {
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

  return (
    <div className="flex items-center justify-center h-screen">
      <BackButton />
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12 bg-inherit">
              <p className="max-w-xl text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat mollitia?</p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-pink-600">
                  {" "}
                  348-475-4450{" "}
                </a>

                <address className="mt-2 not-italic">76 Montague Street Brooklyn, NY 11201</address>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
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
                  <SubmitButton formAction={createTicket} className="rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto" pendingText="Submitting..">
                    Submit
                  </SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
