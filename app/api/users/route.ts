import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

// export async function GET() {
//     const result = await pool.query('SELECT* From users');
//     return Response.json(result.rows);
// }

export async function GET() {
    const data = await prisma.user.findMany();
    return NextResponse.json(data, { status: 200 })
}


export async function POST(req: Request) {
    try {

        const { username, password, tasks } = await req.json()
         const user = await prisma.user.create({
      data: {
        username,
        password,
        tasks: {
          create: tasks?.map((task: any) => ({
            taskTitle: task.taskTitle,
            taskDescription: task.taskDescription,
          })),
        },
      },
      include: {
        tasks: true,
      },
    });
        return NextResponse.json(user, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, {
            status: 500
        })
    }

}

