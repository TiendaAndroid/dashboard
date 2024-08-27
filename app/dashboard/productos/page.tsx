"use client";
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

interface ProductData {
  id: string;
  price: number;
  image: { url: string }[];
  color: string[];
  name: string;
  description: string;
  discount: number;
  material: string[];
  size: string[]; // Asegura que los tamaños sean números
  stock: number;
  isActive: boolean;
}

export default function Productos() {
  const [products, setProducts] = useState<ProductData[]>([]);

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Producto eliminado correctamente");
        window.location.reload();
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <main className="flex h-screen flex-col items-center p-8 bg-gray-200 space-y-8">
      <div className="flex w-full text-xl">
        <h1 className="font-bold">Lista de productos</h1>
      </div>
      <div className="flex w-full">
        <Link
          href={"/dashboard/productos/agregar"}
          className="bg-[#D5507C] text-center hover:bg-[#bf486f] py-4 rounded w-full font-bold text-white text-lg"
        >
          Agregar producto
        </Link>
      </div>
      <div className="flex w-full bg-white rounded-xl ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#D5507C] ">
              <TableRow>
                <TableCell className="font-bold text-white text-lg">
                  Productos
                </TableCell>
                <TableCell className="font-bold text-white text-lg">
                  Precio MNX
                </TableCell>
                <TableCell className="font-bold text-white text-lg">
                  Colores
                </TableCell>
                <TableCell className="font-bold text-white text-lg">
                  Tipos
                </TableCell>
                <TableCell className="font-bold text-white text-lg">
                  Stock
                </TableCell>
                <TableCell className="font-bold text-white text-lg">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="flex flex-row items-center space-x-5">
                    <Image
                      src={product.image[0].url}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="rounded-xl h-[80px] w-[80px]"
                    />
                    <p>{product.name}</p>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.material}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="space-x-6 text-xl text-[#722c43]">
                    <button>
                      <FaTrashAlt onClick={() => handleDelete(product.id)} />
                    </button>
                    <button>
                      <Link href={`/dashboard/productos/editar/${product.id}`}>
                        <FaPencilAlt />
                      </Link>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
