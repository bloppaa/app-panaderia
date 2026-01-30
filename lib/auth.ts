import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const PIN_APP = process.env.PIN_APP || "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado en las variables de entorno");
}

if (!PIN_APP) {
  throw new Error("PIN_APP no está configurado en las variables de entorno");
}

export interface TokenPayload {
  authenticated: boolean;
  timestamp: number;
}

/**
 * Generar un JWT válido
 */
export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token válido por 7 días
    algorithm: "HS256",
  });
}

/**
 * Verificar y decodificar un JWT
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return decoded as TokenPayload;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
}

/**
 * Validar PIN y generar token
 */
export function validatePinAndGenerateToken(pin: string): string | null {
  if (pin === PIN_APP) {
    const payload: TokenPayload = {
      authenticated: true,
      timestamp: Date.now(),
    };
    return signToken(payload);
  }
  return null;
}

/**
 * Verificar si un token es válido
 */
export function isTokenValid(token: string): boolean {
  const payload = verifyToken(token);
  return payload !== null && payload.authenticated === true;
}
