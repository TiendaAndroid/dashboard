"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

interface ProductData {
  id: string;
  price: number;
  image: { url: string }[];
  color: string[];
  name: string;
  description: string;
  discount: number;
  type: string[];
  stock: number;
  isActive: boolean;
}

export default function Productos() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10); // Ajusta el límite según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`,
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
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          searchTerm
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search/all/${searchTerm}`
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/all?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setProducts(data.data);
          if (!searchTerm) {
            setTotalPages(Math.ceil(data.totalResults / limit));
          }
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [offset, limit, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(page - 1);
  };

  return (
    <main className="flex h-screen flex-col items-center p-8 space-y-8">
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

      <div className="flex w-full">
        <div className="flex flex-col w-full bg-white rounded-xl p-5 mb-8 shadow-md">
          <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
          <div className="flex flex-row space-x-5 w-full">
            <Input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              startContent={<IoSearch />}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOffset(0); // Reset offset when search term changes
                setCurrentPage(1); // Reset to first page when search term changes
              }}
              className="mb-4 "
            />
          </div>
          <div className="overflow-x-auto">
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader className="text-3xl">
                <TableColumn>IMAGEN</TableColumn>
                <TableColumn>NOMBRE</TableColumn>
                <TableColumn>TIPO </TableColumn>
                <TableColumn>PRECIO </TableColumn>
                <TableColumn>STOCK</TableColumn>
                <TableColumn>ACCIONES</TableColumn>
              </TableHeader>
              <TableBody
                isLoading={isLoading}
                loadingContent={
                  <Spinner
                    label="Cargando..."
                    className="bg-white p-5 rounded-md"
                  />
                }
              >
                {products.map((productos) => (
                  <TableRow
                    key={productos.id}
                    className="border-b-2 border-gray-100"
                  >
                    <TableCell>
                      <Image
                        src={productos.image[0].url}
                        alt={productos.name}
                        width={128}
                        height={128}
                        className="h-20 w-20"
                      />
                    </TableCell>
                    <TableCell className="font-bold">
                      {productos.name}
                    </TableCell>
                    <TableCell>{productos.type}</TableCell>
                    <TableCell>${productos.price}</TableCell>
                    <TableCell>{productos.stock}</TableCell>
                    <TableCell>
                      <div className="space-x-5">
                        <button className="text-xl  hover:text-primary p-3 rounded-lg">
                          <Link
                            href={`/dashboard/productos/editar/${productos.id}`}
                          >
                            <FaRegEdit />
                          </Link>
                        </button>
                        <button
                          onClick={() => handleDelete(productos.id)}
                          className="text-xl bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!searchTerm && (
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
          )}
        </div>
      </div>
    </main>
  );
}
