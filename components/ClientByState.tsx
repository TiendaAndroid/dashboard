"use client";
import { User } from "@/interfaces/Users";
import React, { useEffect, useState } from "react";

interface ClientByStateProps {
  estadoSeleccionado: string;
}

const ClientByState: React.FC<ClientByStateProps> = ({
  estadoSeleccionado,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/private-roles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setIsLoading(false);
          setUsers(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const filteredUsers = users
    .filter((user) =>
      user.direction.some((dir) => dir.estado === estadoSeleccionado)
    )
    .slice(0, 3);

  return (
    <div className="h-full p-5 space-y-3">
      <p>{estadoSeleccionado || "Seleccionar estado"}</p>
      <div className="flex h-[2px] bg-gray-200 w-full"></div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex w-full flex-row items-center space-x-5"
          >
            <div className="flex flex-col space-y-3 w-3/5">
              <p>{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className="flex w-1/5 justify-center items-center flex-col space-y-3">
              <p>
                {
                  user.direction.find(
                    (dir) => dir.estado === estadoSeleccionado
                  )?.calle
                }
              </p>
              <p className="text-gray-500">
                {
                  user.direction.find(
                    (dir) => dir.estado === estadoSeleccionado
                  )?.municipio
                }
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClientByState;
