import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ImageShare - Plataforma de Imágenes",
  description: "Plataforma online para subir, compartir y gestionar tus imágenes con perfiles personalizados",
  keywords: "subir imágenes, galería, fotos, compartir, perfil, online",
  openGraph: {
    title: "ImageShare - Plataforma de Imágenes",
    description: "Plataforma online para subir, compartir y gestionar tus imágenes",
  },
  twitter: {
    title: "ImageShare - Plataforma de Imágenes",
    description: "Plataforma online para subir, compartir y gestionar tus imágenes",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
