import { Pool } from "pg";
const pool = new Pool();
const db = {
  query: (text: string, params: any[]) => pool.query(text, params),
};

export default db;
