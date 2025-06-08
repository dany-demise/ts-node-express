// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const DATABASE_URL:string = "postgres://postgres:postgres@localhost:5432/mydb"

const db = drizzle(DATABASE_URL);


/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 3000;

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypessScript Server");
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
  
// const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'Johxxn',
    age: 311,
    email: 'johxxn@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 317
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log('User deleted!')
}

main();

