import { asc, desc } from "drizzle-orm";
import { db } from "../drizzle";
import { discipline, games } from "../drizzle/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {

    const [years, disciplines] = await Promise.all([
        db.select({ year: games.year, }).from(games).orderBy(desc(games.year),),
        db.select().from(discipline).orderBy(asc(discipline.disciplineName),)
    ])

    return {
        years: years.map(({ year }) => year),
        disciplines: disciplines.map(({ disciplineName }) => disciplineName),
    }
}