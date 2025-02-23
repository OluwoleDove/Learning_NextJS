import { NextResponse } from "next/server";
import Task from "@models/Task";

/**
 * GET - Retrieve all tasks
 */
export async function GET() {
  try {
    const tasks = await Task.findAll();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

/**
 * POST - Create a new task
 */
export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const task = await Task.create({ title });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

/**
 * PUT - Mark task as completed
 */
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Task ID is required" }, { status: 400 });

    const task = await Task.findByPk(id);
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    await task.update({ completed: true });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

/**
 * DELETE - Remove a task
 */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Task ID is required" }, { status: 400 });

    const task = await Task.findByPk(id);
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    await task.destroy();
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
