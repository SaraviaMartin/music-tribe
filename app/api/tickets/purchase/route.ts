
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { ticketPurchaseSchema } from "@/lib/validation"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    
    // Validate input
    const result = ticketPurchaseSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { festivalId, ticketType, quantity } = result.data

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

    // Create purchase record in transaction
    const [purchase] = await prisma.$transaction([
      prisma.ticket.create({
        data: {
          type: ticketType,
          description: ticket.description,
          price: ticket.price,
          quantity,
          festivalId,
          userId: session.user.id,
        }
      }),
      prisma.ticket.update({
        where: { id: ticket.id },
        data: { 
          quantity: ticket.quantity - quantity,
          soldCount: { increment: quantity }
        }
      })
    ])

    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    console.error('Purchase error:', error)
    return NextResponse.json({ error: "Failed to purchase ticket" }, { status: 500 })
  }
}
