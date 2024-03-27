import BackButton from "@/components/BackButton"
import { createClient } from "@/utils/supabase/server"
import { SubmitButton } from "../login/submit-button"

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
      console.log("error", error)
    }
    console.log("success!")
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
                  <input className="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Name" type="text" name="name" id="name" required />
                </div>
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input className="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Email address" type="email" name="email" id="email" required />
                </div>

                <div>
                  <label className="sr-only" htmlFor="description">
                    Description
                  </label>

                  <textarea className="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Description" rows={8} name="description" id="description" required></textarea>
                </div>

                <div className="mt-4">
                  <SubmitButton formAction={createTicket} className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto" pendingText="Submitting..">
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
