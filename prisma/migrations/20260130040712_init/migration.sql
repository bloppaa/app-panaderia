-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "alias" TEXT,
    "precioPorKilo" DECIMAL(10,2) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "valores_por_defecto" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "kilosPorDefecto" DECIMAL(8,3) NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "valores_por_defecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registros" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "fechaEntrega" DATE NOT NULL,
    "kilosVendidos" DECIMAL(8,3) NOT NULL,
    "precioKilo" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_rut_key" ON "clientes"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "valores_por_defecto_clienteId_diaSemana_key" ON "valores_por_defecto"("clienteId", "diaSemana");

-- CreateIndex
CREATE INDEX "registros_fechaEntrega_idx" ON "registros"("fechaEntrega");

-- CreateIndex
CREATE INDEX "registros_fecha_idx" ON "registros"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "registros_clienteId_fechaEntrega_key" ON "registros"("clienteId", "fechaEntrega");

-- AddForeignKey
ALTER TABLE "valores_por_defecto" ADD CONSTRAINT "valores_por_defecto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros" ADD CONSTRAINT "registros_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
