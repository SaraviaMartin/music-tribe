"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MusicIcon, ImageIcon, CalendarIcon, SettingsIcon, UserIcon } from "lucide-react"
import Link from "next/link"

export default function ArtistDashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Cargando...</div>
  }

  if (!session || session.user?.role !== "artist") {
    redirect("/login")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Artista</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Mi Perfil de Artista
            </CardTitle>
            <CardDescription>
              Administra tu información como artista
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
              <Link href="/artist/profile">
                <Button className="w-full">Editar Perfil de Artista</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MusicIcon className="h-5 w-5" />
              Mis Festivales
            </CardTitle>
            <CardDescription>
              Gestiona tus presentaciones en festivales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/artist/festivals">
                <Button className="w-full">Ver Mis Festivales</Button>
              </Link>
              <Link href="/artist/festivals/new">
                <Button variant="outline" className="w-full">Agregar Nuevo Festival</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Galería
            </CardTitle>
            <CardDescription>
              Administra tus fotos y videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/artist/gallery">
                <Button className="w-full">Ver Galería</Button>
              </Link>
              <Link href="/artist/gallery/upload">
                <Button variant="outline" className="w-full">Subir Nuevo Contenido</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendario
            </CardTitle>
            <CardDescription>
              Gestiona tu agenda de presentaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/artist/calendar">
                <Button className="w-full">Ver Calendario</Button>
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
              <Link href="/artist/settings">
                <Button variant="outline" className="w-full">Configuración de la Cuenta</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}