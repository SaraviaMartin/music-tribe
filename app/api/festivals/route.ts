
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const {
      name,
      description,
      startDate,
      endDate,
      location,
      venue,
      category,
      imageUrl,
      features,
      tickets,
    } = data

    const festival = await prisma.festival.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        venue,
        category,
        imageUrl,
        features,
        organizerId: session.user.id,
        status: "published",
      },
    })

    // Create tickets for the festival
    if (tickets && tickets.length > 0) {
      await prisma.ticket.createMany({
        data: tickets.map((ticket: any) => ({
          ...ticket,
          festivalId: festival.id,
          userId: session.user.id,
        })),
      })
    }

    return NextResponse.json(festival, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating festival" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const festivals = await prisma.festival.findMany({
      include: {
        tickets: true,
        organizer: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
    return NextResponse.json(festivals)
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching festivals" },
      { status: 500 }
    )
  }
}
