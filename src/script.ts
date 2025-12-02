import { db } from "./lib/server/db"
import d from "../data.json"
import { country, discipline, event, games, gender } from "./lib/server/db/schema"
import type { PgInsert, PgInsertBase } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

type T = {
    discipline: string,
    event: string,
    gender: string,
    type: string,
    medal: string,
    name: string,
    countryCode: string,
    country: string,
    city: string,
    year: number
}

const data = d as T[]

// Insert disciplines

const ins = Array.from(new Set(data.map(x => x.discipline)))
await db.insert(discipline).values(ins.map(x => ({disciplineName: x})))

// Insert countries

const set = new Set()
const ins2 = data.reduce((acc, curr) => {
    if (set.has(curr.countryCode)) return acc;
    set.add(curr.countryCode)
    acc.push({country: curr.country, countryCode: curr.countryCode})
    return acc
}, [] as {country: string, countryCode: string}[])

await db.insert(country).values(ins2)

// Insert games

const s = new Set()
const i3 = data.reduce((acc, curr) => {
    const games = curr.year
    if (s.has(games)) return acc;
    s.add(games)
    acc.push({city: curr.city, year: curr.year})
    return acc
}, [] as {year: number, city: string}[])

await db.insert(games).values(i3)

// Insert events

const i4: typeof event.$inferInsert[] = []
const s4 = new Set()

for (const item of data) {
    if (item.type === "Athlete") {
        i4.push({
            countryCode: item.countryCode,
            disciplineName: item.discipline,
            eventName: item.event,
            type: "Individual",
            medal: item.medal,
            gender: item.gender,
            winner: item.name,
            year: item.year
        })
    }
    else {
        const uniq = `${item.countryCode}-${item.event}-${item.year}-${item.medal}`
        if (s4.has(uniq)) continue;
        s4.add(uniq)
        i4.push({
            countryCode: item.countryCode,
            disciplineName: item.discipline,
            eventName: item.event,
            type: "Team",
            medal: item.medal,
            gender: item.gender,
            winner: item.country,
            year: item.year
        })
    }
}
let i = 0
try {
    db.execute(sql`BEGIN`)
    while(i < i4.length) {
        const chunk = i4.slice(i, i + 100)
        await db.insert(event).values(chunk)
    
        i += 100
    }
    db.execute(sql`COMMIT`)
    
} catch (error) {
    db.execute(sql`ROLLBACK`)
    console.error("Error at index:", i, error)
}