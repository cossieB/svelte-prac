import { SQL, sql } from 'drizzle-orm';
import { integer, pgEnum, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

export const discipline = pgTable('discipline', {
	disciplineName: varchar('discipline_name').notNull().primaryKey(),
})

export const gender = pgEnum("gender", ["Male", "Female", "Mixed"]);

export const country = pgTable('country', {
	countryCode: varchar('country_code').notNull().primaryKey(),
	country: varchar('country').notNull().unique(),
})

export const medalTypes = pgEnum('medal_types', ['Gold', 'Silver', 'Bronze']);
export const winnerTypes = pgEnum('winner_types', ['Individual', 'Team']);

export const event = pgTable('event', {
	eventId: integer('event_id').primaryKey().generatedAlwaysAsIdentity(),
	eventName: varchar('event_name').notNull(),
	disciplineName: varchar('discipline_name').notNull().references(() => discipline.disciplineName),
	gender: gender("gender").notNull(),
	winner: varchar('winner').notNull(),
	type: winnerTypes('type').notNull(), // e.g., 'individual' or 'team'
	countryCode: varchar('country_code').notNull().references(() => country.countryCode),
	medal: medalTypes('medal').notNull(), // e.g., 'gold', 'silver', 'bronze'
	year: integer('games').notNull().references(() => games.year),
})

export const games = pgTable('games', {
	year: integer('year').notNull().primaryKey(),
	city: varchar('city').notNull(),
}, t => [
	unique().on(t.city, t.year)
])