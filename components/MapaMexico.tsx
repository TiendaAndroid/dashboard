"use client";

import React from "react";
import Mexico from "@react-map/mexico";

interface MapaMexicoProps {
    onSelectEstado: (estadoNombre: string) => void;
}

const MapaMexico: React.FC<MapaMexicoProps> = ({ onSelectEstado }) => {
    const handleSelect = (estadoNombre: string) => {
        onSelectEstado(estadoNombre)
    };
    return (
      <div className="flex flex-col  w-full h-full space-y-5">
        <Mexico onSelect={handleSelect} size={1000} hoverColor="#D5507C"  type = 'select-single' selectColor="#bf486f" />
      </div>
    );
  };
  export default MapaMexico;
