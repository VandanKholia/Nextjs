import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  userId: string;
};

export async function DELETE(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { userId } = await params;
  const id = parseInt(userId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { userId: id } });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { userId } = await params;
  const id = parseInt(userId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId: id },
      include: { tasks: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const id = parseInt(userId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { username, password, tasks } = body;

    const user = await prisma.user.update({
      where: { userId: id },
      data: {
        username,
        password,
        tasks: {
          deleteMany: {}, 
          create: (tasks || []).map((t: any) => ({
            taskTitle: t.taskTitle,
            taskDescription: t.taskDescription,
            isCompleted: t.isCompleted ?? false,
          })),
        },
      },
      include: { tasks: true },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.error(err);

    if (err?.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
