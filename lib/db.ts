import { neon } from "@neondatabase/serverless";

export type SqlClient = ReturnType<typeof neon>;

export function db(): SqlClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum dikonfigurasi");
  return neon(url);
}
