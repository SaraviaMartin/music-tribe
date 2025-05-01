
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { festivalId, ticketType, quantity } = await req.json()

    // Check ticket availability
    const ticket = await prisma.ticket.findFirst({
      where: {
        festivalId,
        type: ticketType,
        quantity: { gt: quantity }
      }
    })

    if (!ticket) {
      return NextResponse.json({ error: "Tickets not available" }, { status: 400 })
    }

    // Create purchase record
    const purchase = await prisma.ticket.create({
      data: {
        type: ticketType,
        description: ticket.description,
        price: ticket.price,
        quantity,
        festivalId,
        userId: session.user.id,
      }
    })

    // Update ticket inventory
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { 
        quantity: ticket.quantity - quantity,
        soldCount: ticket.soldCount + quantity
      }
    })

    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to purchase ticket" }, { status: 500 })
  }
}
