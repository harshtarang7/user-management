import pg from "pg";
import dotenv from "dotenv";

const { Pool, Client } = pg;
dotenv.config()

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

export async function connectDB() {
  try {
    await client.connect();

    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED:", error);
  }
}

export default client;
