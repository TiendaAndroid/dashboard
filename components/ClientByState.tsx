import React from "react";

// Define the prop types for TypeScript
interface ClientByStateProps {
  estadoSeleccionado: string;
}

const ClientByState: React.FC<ClientByStateProps> = ({ estadoSeleccionado }) => {
    return (
      <div className="h-full p-5 space-y-3">
        <p>{estadoSeleccionado || "Seleccionar estado"}</p>
        <div className="flex h-[2px] bg-gray-200 w-full"></div>
        <div className="flex w-full flex-row items-center space-x-5">
          <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
          <div className="flex flex-col space-y-3 w-3/5">
            <p>Toalla 1</p>
            <p className="text-gray-500">$120</p>
          </div>
          <div className="flex w-1/5 justify-center items-center flex-col space-y-3">
            <p>$15,920</p>
            <p className="text-gray-500">20 ventas</p>
          </div>
        </div>
        <div className="flex w-full flex-row items-center space-x-5">
          <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
          <div className="flex flex-col space-y-3 w-3/5">
            <p>Toalla 1</p>
            <p className="text-gray-500">$120</p>
          </div>
          <div className="flex w-1/5 justify-center items-center flex-col space-y-3">
            <p>$15,920</p>
            <p className="text-gray-500">20 ventas</p>
          </div>
        </div>
        <div className="flex w-full flex-row items-center space-x-5">
          <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
          <div className="flex flex-col space-y-3 w-3/5">
            <p>Toalla 1</p>
            <p className="text-gray-500">$120</p>
          </div>
          <div className="flex w-1/5 justify-center items-center flex-col space-y-3">
            <p>$15,920</p>
            <p className="text-gray-500">20 ventas</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ClientByState;
  