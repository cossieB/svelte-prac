// place files you want to import through the `$lib` alias in this folder.

import { sql, eq } from "drizzle-orm"
import { db } from "../drizzle"
import { event } from "../drizzle/schema"

export const resultsQuery = db
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
    .$dynamic()
