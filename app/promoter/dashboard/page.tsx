"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ImageIcon, SettingsIcon, UserIcon, TicketIcon, DollarSignIcon } from "lucide-react"
import Link from "next/link"

export default function PromoterDashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Cargando...</div>
  }

  if (!session || session.user?.role !== "promoter") {
    redirect("/login")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Promotor</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Mi Perfil de Promotor
            </CardTitle>
            <CardDescription>
              Administra tu información como promotor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{session.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session.user?.email}</p>
              </div>
              <Link href="/promoter/profile">
                <Button className="w-full">Editar Perfil de Promotor</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Mis Festivales
            </CardTitle>
            <CardDescription>
              Gestiona los festivales que promueves
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/promoter/festivals">
                <Button className="w-full">Ver Mis Festivales</Button>
              </Link>
              <Link href="/promoter/festivals/new">
                <Button variant="outline" className="w-full">Crear Nuevo Festival</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TicketIcon className="h-5 w-5" />
              Ventas de Entradas
            </CardTitle>
            <CardDescription>
              Monitorea las ventas de tus festivales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/promoter/tickets">
                <Button className="w-full">Ver Ventas</Button>
              </Link>
              <Link href="/promoter/tickets/analytics">
                <Button variant="outline" className="w-full">Análisis de Ventas</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSignIcon className="h-5 w-5" />
              Finanzas
            </CardTitle>
            <CardDescription>
              Administra los ingresos y gastos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/promoter/finances">
                <Button className="w-full">Ver Finanzas</Button>
              </Link>
              <Link href="/promoter/finances/reports">
                <Button variant="outline" className="w-full">Reportes Financieros</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Marketing
            </CardTitle>
            <CardDescription>
              Gestiona el marketing de tus festivales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/promoter/marketing">
                <Button className="w-full">Ver Campañas</Button>
              </Link>
              <Link href="/promoter/marketing/new">
                <Button variant="outline" className="w-full">Crear Nueva Campaña</Button>
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
              <Link href="/promoter/settings">
                <Button variant="outline" className="w-full">Configuración de la Cuenta</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}