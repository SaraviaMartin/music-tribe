
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { festivalId, type, quantity } = await req.json()

    const ticket = await prisma.ticket.findFirst({
      where: { 
        festivalId,
        type,
        quantity: { gt: 0 }
      }
    })

    if (!ticket) {
      return NextResponse.json(
        { error: "Tickets not available" },
        { status: 400 }
      )
    }

    // Create user ticket purchase
    const userTicket = await prisma.ticket.create({
      data: {
        type,
        price: ticket.price,
        quantity,
        festivalId,
        userId: session.user.id,
      },
    })

    // Update available ticket count
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { 
        quantity: ticket.quantity - quantity,
        soldCount: ticket.soldCount + quantity
      },
    })

    return NextResponse.json(userTicket, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Error purchasing ticket" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
      include: {
        festival: true,
      },
    })
    
    return NextResponse.json(tickets)
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tickets" },
      { status: 500 }
    )
  }
}
