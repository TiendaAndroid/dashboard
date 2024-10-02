"use client";

import React, { useEffect, useState } from "react";
import MapaMexico from "@/components/MapaMexico";
import ClientByState from "@/components/ClientByState";
import { User } from "@/interfaces/Users";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

export default function Usuarios() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("");
  const handleEstadoSelect = (estadoNombre: string) => {
    setEstadoSeleccionado(estadoNombre);
  };
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/private-roles`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza `yourToken` con tu token real
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
  }, []);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleAdminToggle = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/createAdmin/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // Reemplaza `yourToken` con tu token real
          },
        }
      );
      if (response.ok) {
        console.log("Rol de admin actualizado correctamente");
        // Actualiza la lista de usuarios después de cambiar el rol
        const updatedUsers = users.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: user.role.includes("admin")
                  ? user.role.filter((r) => r !== "admin")
                  : [...user.role, "admin"],
              }
            : user
        );
        setUsers(updatedUsers);
      } else {
        console.error("Error al actualizar el rol de admin");
      }
    } catch (error) {
      console.error("Error al actualizar el rol de admin", error);
    }
  };

  const handleUserToggle = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/createUser/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // Reemplaza `yourToken` con tu token real
          },
        }
      );
      if (response.ok) {
        console.log("Rol de admin actualizado correctamente");
        // Actualiza la lista de usuarios después de cambiar el rol
        const updatedUsers = users.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: user.role.includes("admin")
                  ? user.role.filter((r) => r !== "admin")
                  : [...user.role, "admin"],
              }
            : user
        );
        setUsers(updatedUsers);
      } else {
        console.error("Error al actualizar el rol de admin");
      }
    } catch (error) {
      console.error("Error al actualizar el rol de admin", error);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof User];
    const bValue = b[sortColumn as keyof User];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    `${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex h-screen flex-col items-center p-8 space-y-8">
      <div className="flex w-full text-xl">
        <h1 className="font-bold">Usuarios</h1>
      </div>

      <div className="flex w-full space-x-5">
        <div className="flex w-1/2 bg-white rounded-xl p-5 justify-center items-center shadow-md">
          <MapaMexico onSelectEstado={handleEstadoSelect} />
        </div>
        <div className="flex flex-col w-1/2 bg-white rounded-xl shadow-md">
          <ClientByState estadoSeleccionado={estadoSeleccionado} />
        </div>
      </div>
      <div className="flex w-full space-x-5 ">
        <div className="flex flex-col w-full bg-white rounded-xl p-5 mb-8 shadow-md">
          <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
          <input
            type="text"
            placeholder="Buscar por email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader className="text-3xl">
              <TableColumn onClick={() => handleSort("name")}>
                NOMBRE{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("email")}>
                EMAIL{" "}
                {sortColumn === "email" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("role")}>
                ROLES{" "}
                {sortColumn === "role" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn>ACCIONES</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner label="Cargando..." />}
            >
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b-2 border-gray-100">
                  <TableCell className="p-5">
                    {user.name} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role.map((role, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor:
                            role === "admin" ? "#D1F4E0" : "#FDEDD3",
                          color: role === "admin" ? "#12A150" : "#C58620",
                          padding: role === "admin" ? "3px 10px" : "3px 10px",
                          borderRadius: role === "admin" ? "5px" : "5px",
                          marginRight: "4px",
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-[#D5507C] text-white px-4 py-2 rounded-xl"
                      onClick={() => {
                        if (user.role.includes("admin")) {
                          handleUserToggle(user.id);
                        } else {
                          handleAdminToggle(user.id);
                        }
                      }}
                    >
                      {user.role.includes("admin")
                        ? "Quitar de Admin"
                        : "Hacer Admin"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
