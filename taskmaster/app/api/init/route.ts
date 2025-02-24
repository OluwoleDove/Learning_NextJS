import { NextResponse } from "next/server";
import sequelize from "@lib/sequelize";
import Task from "@models/Task";

export async function GET() {
  try {
    await sequelize.sync({ force: true }); // Recreates tables
    console.log("Tables recreated.");
    return NextResponse.json({ message: "Database initialized!" });
  } catch (error) {
    console.error("Database initialization failed:", error);
    return NextResponse.json({ error: "Database initialization failed." }, { status: 500 });
  }
}