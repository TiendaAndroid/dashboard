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
  Pagination,
} from "@nextui-org/react";
import { Orders } from "@/interfaces/Orders";
import Link from "next/link";

export default function Usuarios() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("");
  const handleEstadoSelect = (estadoNombre: string) => {
    setEstadoSeleccionado(estadoNombre);
  };
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [token, setToken] = useState<string | null>(null);
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setOrders(data.data);
          setTotalPages(Math.ceil(data.totalResults / 10));
          setIsLoading(false);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchOrders();
  }, [offset, token]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(page - 1);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
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

  const formatDateToMexico = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  };

  return (
    <main className="flex h-screen flex-col items-center p-8 space-y-8">
      <div className="flex w-full text-xl">
        <h1 className="font-bold">Ordenes</h1>
      </div>
      <div className="flex w-full space-x-5 ">
        <div className="flex flex-col w-full bg-white rounded-xl p-5 mb-8 shadow-md">
          <h2 className="text-xl font-bold mb-4">Lista de las ordenes</h2>
          <input
            type="text"
            placeholder="Buscar por email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <div className="overflow-x-auto">
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader className="text-3xl">
              <TableColumn onClick={() => handleSort("name")}>
                CLIENTE{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("email")}>
                ESTATUS{" "}
                {sortColumn === "email" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("role")}>
                FECHA DE PAGO{" "}
                {sortColumn === "role" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("paid")}>
                PAGO{" "}
                {sortColumn === "paid" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("paid")}>
                ESTADO{" "}
                {sortColumn === "paid" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("paid")}>
                ARTICULOS{" "}
                {sortColumn === "paid" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
              <TableColumn onClick={() => handleSort("paid")}>
                ACCIONES{" "}
                {sortColumn === "paid" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner label="Cargando..." />}
            >
              {orders.map((ordenes, index) => (
                <TableRow
                  key={ordenes.id}
                  className="border-b-2 border-gray-100"
                >
                  <TableCell className="p-5">{ordenes.user.email}</TableCell>
                  <TableCell>{ordenes.status}</TableCell>
                  <TableCell>{formatDateToMexico(ordenes.createdAt)}</TableCell>
                  <TableCell>
                    {ordenes.order_items
                      .reduce(
                        (previousValue, currentValue) =>
                          previousValue +
                          currentValue.product.price * currentValue.quantity,
                        0
                      )
                      .toLocaleString("es-MX", {
                        style: "currency",
                        currency: "MXN",
                      })}
                  </TableCell>
                  <TableCell>{ordenes.estado}</TableCell>
                  <TableCell>
                    {ordenes.order_items.map((order) => (
                      <p key={order.id}>
                        {order.quantity + " " + order.product.name}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/ordenes/${ordenes.id}`}
                      className="bg-primary hover:bg-pink-600 text-white px-3 py-1 rounded-md"
                    >
                      Ver orden
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <div className="flex w-full justify-center pt-6">
            <Pagination
              showControls
              total={totalPages}
              initialPage={1}
              color={"primary"}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
