import BackButton from "@/components/BackButton"
import Form from "./form"

export default function NewTicket() {
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
              <Form />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
