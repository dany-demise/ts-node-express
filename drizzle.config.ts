import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const DATABASE_URL:string = "postgres://postgres:postgres@localhost:5432/mydb"


export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});