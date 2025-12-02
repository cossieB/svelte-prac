import { db } from "$lib/server/db";
import { games } from "../lib/server/db/schema";

export async function load() {
    const years = await db.select({ year: games.year, }).from(games)
    return {
        years: years.map(({ year }) => year)
    }
}