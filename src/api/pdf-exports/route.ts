import { type NextRequest, NextResponse } from "next/server"
import { Client } from "@upstash/qstash"
import { db } from "@/src/db"
import { pdfExports } from "@/src/db/schema"
import { v4 as uuidv4 } from "uuid"

// Initialize QStash client
const qstash = new Client({
  token: process.env.QSTASH_TOKEN || "",
})

export async function POST(request: NextRequest) {
  try {
    const { method } = await request.json()

    // Generate a unique ID for this export
    const exportId = uuidv4()

    // Create a record in the database using Drizzle
    await db.insert(pdfExports).values({
      id: exportId,
      status: "pending",
      createdAt: new Date(),
    })

    // Send a message to QStash to process the PDF export
    await qstash.publishJSON({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/pdf-exports/process`,
      body: {
        exportId,
        method,
      },
      // Optional: delay the job by 2 seconds to simulate processing time
      delay: 2,
    })

    return NextResponse.json({ id: exportId }, { status: 201 })
  } catch (error) {
    console.error("Error creating PDF export:", error)
    return NextResponse.json({ error: "Failed to create PDF export" }, { status: 500 })
  }
}
