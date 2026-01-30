import { NextRequest, NextResponse } from "next/server";
import { validatePinAndGenerateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();

    if (!pin || typeof pin !== "string") {
      return NextResponse.json({ error: "PIN inválido" }, { status: 400 });
    }

    // Validar PIN y generar token
    const token = validatePinAndGenerateToken(pin);

    if (!token) {
      return NextResponse.json({ error: "PIN incorrecto" }, { status: 401 });
    }

    // Crear respuesta con cookie
    const response = NextResponse.json(
      { success: true, message: "Autenticación exitosa" },
      { status: 200 },
    );

    // Establecer cookie httpOnly con el token
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 },
    );
  }
}
