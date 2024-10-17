"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Orders } from "@/interfaces/Orders";
import { Spinner } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Image from "next/image";

export default function Ordenes({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Orders>();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState("SEND");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${params.orderId}`
        );
        const data = await response.json();
        if (data && typeof data === "object") {
          setOrder(data);
          setLoading(false);
          calculateTotal(data);
          setOrderStatus(data.status); // Set initial order status
        } else {
          console.error("Data is not an object:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const calculateTotal = (order: Orders) => {
    const totalAmount = order.order_items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const handleStatusChange = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${params.orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: orderStatus }),
        }
      );
      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el estado:", errorData);
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  if (loading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <Spinner label="Cargando..." className="bg-white p-5 rounded-md" />
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col items-center p-8 space-y-8">
      <div className="flex w-full text-xl">
        <h1 className="font-bold">Detalles de las ordenes</h1>
      </div>
      <div className="flex w-full space-x-5 ">
        <div className="flex flex-col w-full bg-white rounded-xl p-5 mb-8 shadow-md">
          <div className="overflow-auto">
            <div className="w-full justify-between flex flex-row p-5">
              <p className="font-bold">Orden #: {params.orderId}</p>
              <p>{order?.status}</p>
            </div>
            <div>
              <div className="flex flex-row">
                <p className="font-bold">Cliente:</p>
                <p className="ml-2">
                  {order?.user?.name} {order?.user?.lastName}
                </p>
              </div>

              <div className="flex flex-row">
                <p className="font-bold">Correo:</p>
                <p className="ml-2">{order?.user?.email}</p>
              </div>

              <div className="flex flex-row">
                <p className="font-bold">Total:</p>
                <p className="ml-2"> $ {(total * 1.16).toFixed(2)}</p>
              </div>
              <div className="flex flex-row">
                <p className="font-bold">Direccion:</p>
              </div>

              <div className="flex flex-col ml-2">
                <p>Calle: {order?.calle}</p>
                <p>Numero: {order?.noExterior}</p>
                <p>Colonia: {order?.colonia}</p>
                <p>Municipio o alcaldía: {order?.municipio}</p>
                <p>Estado: {order?.estado}</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-row items-center space-x-4">
                <p className="font-bold">Cambiar estado a:</p>
                <select
                  className="border rounded-md p-2"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="SEND">Enviado</option>
                  <option value="DELIVERED">Entregado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
                <button
                  className="bg-[#D5507C] text-center hover:bg-[#bf486f] p-2 rounded font-bold text-white"
                  onClick={handleStatusChange}
                >
                  Cambiar
                </button>
              </div>
            </div>
            <div className="mt-5 text-lg p-5">
              <h1 className="font-bold">Artículos:</h1>
            </div>
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader className="text-3xl">
                <TableColumn>IMAGEN</TableColumn>
                <TableColumn>NOMBRE</TableColumn>
                <TableColumn>TIPO </TableColumn>
                <TableColumn>PRECIO </TableColumn>
                <TableColumn>STOCK</TableColumn>
              </TableHeader>
              <TableBody
                isLoading={loading}
                loadingContent={
                  <Spinner
                    label="Cargando..."
                    className="bg-white p-5 rounded-md"
                  />
                }
              >
                {order?.order_items?.map((productos) => (
                  <TableRow
                    key={productos.id}
                    className="border-b-2 border-gray-100"
                  >
                    <TableCell>
                      <Image
                        src={productos.product.image[0].url}
                        alt={productos.product.name}
                        width={128}
                        height={128}
                        className="h-20 w-20"
                      />
                    </TableCell>
                    <TableCell className="font-bold">
                      {productos.product.name}
                    </TableCell>
                    <TableCell>{productos.product.type}</TableCell>
                    <TableCell>${productos.product.price}</TableCell>
                    <TableCell>{productos.product.price}</TableCell>
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
