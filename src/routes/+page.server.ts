import { inArray, sql, and } from "drizzle-orm";
import { db } from "../drizzle";
import type { PageServerLoad } from "./$types";
import { event } from "../drizzle/schema";

export const load: PageServerLoad = async ({ url, depends }) => {
    depends("app:results");
    const d = url.searchParams.getAll("disciplines");
    const y = url.searchParams.getAll("years").map(Number);
    const g = url.searchParams.getAll("genders")

        const conditions = [];
    if (d.length > 0) {
        conditions.push(inArray(event.disciplineName, d));
    }
    if (y.length > 0) {
        conditions.push(inArray(event.year, y));
    }
    if (g.length > 0) {
        conditions.push(inArray(event.gender, ["Female"]));
    }

    const resultsQuery = db
    .select({
        NOC: event.countryCode,
        gold: sql<number>`SUM(CASE WHEN ${event.medal} = 'Gold' THEN 1 ELSE 0 END)`.as("gold"),
        silver: sql<number>`SUM(CASE WHEN ${event.medal} = 'Silver' THEN 1 ELSE 0 END)`.as("silver"),
        bronze: sql<number>`SUM(CASE WHEN ${event.medal} = 'Bronze' THEN 1 ELSE 0 END)`.as("bronze"),
        total: sql<number>`COUNT(*)`.as("total"),
    })
    .from(event)
    .groupBy(event.countryCode)
    .orderBy(sql`gold DESC, silver DESC, bronze DESC`)
    .where(and(...conditions))

    const results = await resultsQuery;
    console.log(d,y,g);

    return {
        results
    }
}