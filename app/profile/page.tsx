
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      tickets: {
        include: {
          festival: true,
        },
      },
    },
  })
}

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session?.user) return null

  const profile = await getUserProfile(session.user.id)
  if (!profile) return null

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.image || ""} alt={profile.name || ""} />
              <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tickets">
              <TabsList>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="info">Account Info</TabsTrigger>
              </TabsList>
              <TabsContent value="tickets" className="space-y-4">
                {profile.tickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold">{ticket.festival.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ticket.type} - Quantity: {ticket.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${ticket.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="info">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Member Since</h3>
                    <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
