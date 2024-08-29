"use client";

import React, { useState } from "react";
import MapaMexico from "@/components/MapaMexico";
import ClientByState from "@/components/ClientByState";

export default function Usuarios() {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("");
    const handleEstadoSelect = (estadoNombre: string) => {
        setEstadoSeleccionado(estadoNombre);
    }
  return (
    <main className="flex h-screen flex-col items-center p-8 bg-gray-200 space-y-8">
        <div className="flex w-full text-xl">
            <h1 className="font-bold">Usuarios</h1>
        </div>

        <div className="flex w-full space-x-5">
            <div className="flex w-1/2 bg-white rounded-xl p-5 justify-center items-center">
                <MapaMexico onSelectEstado={handleEstadoSelect} />
            </div>
            <div className="flex flex-col w-1/2 bg-white rounded-xl">
                <ClientByState estadoSeleccionado={estadoSeleccionado} />
            </div>
        </div>
    </main>
  );
}
