"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { NumericKeypad } from "@/components/NumericKeypad";
import { Card } from "@/components/Card";

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNumberPress = (num: string) => {
    if (pin.length < 6) {
      setPin(pin + num);
      setError("");
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError("");
  };

  const handleSubmit = async () => {
    if (pin.length < 4) {
      setError("El PIN debe tener al menos 4 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir a la página principal
        router.push("/hoy");
        router.refresh();
      } else {
        setError(data.error || "PIN incorrecto");
        setPin("");
      }
    } catch (err) {
      setError("Error de conexión. Intente nuevamente.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🍞</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            App Panadería
          </h2>
          <p className="text-xl text-gray-600">Ingrese su PIN</p>
        </div>

        {/* Display de PIN */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-3 mb-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`
                  w-14 h-14 rounded-lg border-2 flex items-center justify-center
                  ${i < pin.length ? "border-green-500 bg-green-50" : "border-gray-300"}
                `}
              >
                {i < pin.length && (
                  <span className="text-3xl text-green-600">●</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-base text-gray-500">
            {pin.length}/6 dígitos
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <p className="text-red-700 text-lg font-semibold text-center">
              {error}
            </p>
          </div>
        )}

        {/* Teclado numérico */}
        <div className="mb-6">
          <NumericKeypad
            onNumberPress={handleNumberPress}
            onBackspace={handleBackspace}
          />
        </div>

        {/* Botón de ingreso */}
        <Button
          onClick={handleSubmit}
          disabled={pin.length < 4 || loading}
          className="w-full"
          size="large"
        >
          {loading ? "Verificando..." : "Ingresar"}
        </Button>
      </Card>
    </div>
  );
}
