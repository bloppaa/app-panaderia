import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/login", "/api/login"];

  // Si es una ruta pública, permitir acceso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Obtener JWT de las cookies
  const token = request.cookies.get("auth_token")?.value;

  // Si no hay token o no es válido, redirigir a login
  if (!token || !(await isTokenValid(token))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token válido, permitir acceso
  return NextResponse.next();
}

// Configurar qué rutas protege el middleware
export const config = {
  matcher: [
    // Proteger todas las rutas excepto las públicas especificadas arriba
    "/((?!_next/static|_next/image|favicon.ico|login|api/login).*)",
  ],
};
