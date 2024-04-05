import { randBetweenDate, randCatchPhrase, randEmail, randFirstName, seed } from "@ngneat/falso"
import fs from "fs"
import { EOL } from "os"

const filePath = "supabase/seed.sql"
seed("zealthy-constant-seed")

interface Ticket {
  name: string
  email: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

const generateFakeTickets = () => {
  const tickets: Array<Ticket> = new Array(500).fill(-1).map((_v) => {
    const idx = Math.floor(Math.random() * 3)
    const randomStatus = ["new", "in progress", "resolved"][idx]
    const createdAt = randBetweenDate({ from: new Date("10/07/1998"), to: new Date() }).toISOString()
    return {
      name: randFirstName(),
      email: randEmail(),
      description: randCatchPhrase(),
      status: randomStatus,
      created_at: createdAt,
      updated_at: createdAt,
    }
  })
  return tickets
}

const main = () => {
  const tickets = generateFakeTickets()
  const formattedTickets: string[] = tickets.map((ticket) => {
    return `('${ticket.name}', '${ticket.email}', '${ticket.description}', '${ticket.status}', '${ticket.created_at}', '${ticket.updated_at}')`
  })

  // build batch-insert statement from concatenated vals
  const batchInsertStatement: string = `INSERT INTO "public"."tickets" ("name", "email", "description", "status", "created_at", "updated_at") VALUES ${formattedTickets.join(",\n")};`

  fs.appendFileSync(filePath, EOL, "utf8")
  fs.appendFileSync(filePath, EOL, "utf8")
  fs.appendFileSync(filePath, "--\n-- Begin seeding...\n--\n", "utf8")
  fs.appendFileSync(filePath, batchInsertStatement, "utf8")
  fs.appendFileSync(filePath, EOL, "utf8")

  console.log("Seeding is done..🚀")
}

main()
