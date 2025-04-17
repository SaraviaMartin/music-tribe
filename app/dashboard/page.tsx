"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserIcon, TicketIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Verificar si el usuario tiene un rol específico
  if (session?.user?.role && session.user.role !== "user") {
    redirect(`/${session.user.role}/dashboard`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Mi Perfil
            </CardTitle>
            <CardDescription>
              Administra tu información personal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{session?.user?.name || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session?.user?.email || "No especificado"}</p>
              </div>
              <Link href="/profile">
                <Button className="w-full">Editar Perfil</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TicketIcon className="h-5 w-5" />
              Mis Entradas
            </CardTitle>
            <CardDescription>
              Gestiona tus entradas a festivales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">No tienes entradas activas</p>
              <Link href="/tickets">
                <Button variant="outline" className="w-full">Ver Mis Entradas</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Configuración
            </CardTitle>
            <CardDescription>
              Administra tus preferencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/settings">
                <Button variant="outline" className="w-full">Configuración de la Cuenta</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 