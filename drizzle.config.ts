import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/drizzle',
	dialect: 'postgresql',
	driver: "pglite",
	dbCredentials: { url: "./data" },
	verbose: true,
	strict: true
});
