export const runtime = "nodejs";
import pool from "@/lib/db";

export async function GET() {
    const result = await pool.query('SELECT* From users');
    return Response.json(result.rows);
}