import Image from "next/image"

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="w-full relative pt-[100%]">
        <Image src="https://t4.ftcdn.net/jpg/02/33/52/13/240_F_233521311_kcEtMTByrGScsTdFGu58Uhw8NRgMPnW0.jpg" alt="pic of cat playing" objectFit="cover" fill className="w-full h-full top-0 left-0 object-cover rounded-2xl" />
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">The fastest way to resolve a dispute between two cats.</p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  )
}
