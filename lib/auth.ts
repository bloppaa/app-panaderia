import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "";
const PIN_APP = process.env.PIN_APP || "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado en las variables de entorno");
}

if (!PIN_APP) {
  throw new Error("PIN_APP no está configurado en las variables de entorno");
}

// Convertir el secret a Uint8Array para jose
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  authenticated: boolean;
  timestamp: number;
}

/**
 * Generar un JWT válido
 */
export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verificar y decodificar un JWT
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      authenticated: payload.authenticated as boolean,
      timestamp: payload.timestamp as number,
    };
  } catch {
    return null;
  }
}

/**
 * Validar PIN y generar token
 */
export async function validatePinAndGenerateToken(
  pin: string,
): Promise<string | null> {
  if (pin === PIN_APP) {
    const payload: TokenPayload = {
      authenticated: true,
      timestamp: Date.now(),
    };
    return await signToken(payload);
  }
  return null;
}

/**
 * Verificar si un token es válido
 */
export async function isTokenValid(token: string): Promise<boolean> {
  const payload = await verifyToken(token);
  return payload !== null && payload.authenticated === true;
}
