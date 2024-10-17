"use client";
import { ProductInterface } from "@/interfaces/Products";
import { User } from "@/interfaces/Users";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { BsFileBarGraphFill } from "react-icons/bs";

const Card = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSaleProducts, setTotalSalesProducts] = useState(0);
  const [countProduct, setCountProduct] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/count`);
        const data = await response.json();
        setCount(data.totalSales);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/total`);
        const data = await response.json();
        setCountProduct(data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchOrdersData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/total`);
        const data = await response.json();
        setTotalSales(data.totalSales);
        setTotalSalesProducts(data.productsSales);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrdersData();
    fetchProducts();
    fetchProductsData();
  }, []);


  return (
    <div className="flex flex-col  w-full bg-white p-5 space-y-5 rounded-md shadow-md">
      <p className="text-[#06004E] text-xl font-bold">Resumen de los datos</p>
      <div className="flex md:flex-row md:space-x-4 w-full flex-col space-y-5">
        <div className="flex bg-[#FFE2E6] py-3 px-5 rounded-lg md:w-1/4 w-full flex-col space-y-2">
          <div className="text-white bg-[#FA587E] w-max p-3 rounded-full text-xl">
            <FaShoppingBag />
          </div>
          <div className="flex flex-row items-center text-2xl font-bold space-x-5">
            <p className="">{count}</p>
          </div>
          <div className="flex  text-[#576074]">
            <p>Productos vendidos</p>
          </div>
          <div className="flex  text-blue-500 text-sm">
          </div>
        </div>
        <div className="flex bg-[#FFF4DE] py-3 px-5 rounded-lg md:w-1/4 w-full flex-col space-y-2">
          <div className="text-white bg-[#FD9577] w-max p-3 rounded-full text-xl">
            <IoDocumentText />
          </div>
          <div className="flex flex-row items-center text-2xl font-bold space-x-5">
            <p className="">{totalSaleProducts}</p>
          </div>
          <div className="flex  text-[#576074]">
            <p>Ordenes totales</p>
          </div>
          <div className="flex  text-blue-500 text-sm">
          </div>
        </div>
        <div className="flex bg-[#DCFCE7] py-3 px-5 rounded-lg md:w-1/4 w-full flex-col space-y-2">
          <div className="text-white bg-[#39D957] w-max p-3 rounded-full text-xl">
            <BsFileBarGraphFill />
          </div>
          <div className="flex flex-row items-center text-2xl font-bold space-x-5">
            <p className="">
              {totalSales.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </p>
          </div>
          <div className="flex  text-[#576074]">
            <p>Ventas totales</p>
          </div>
          <div className="flex  text-blue-500 text-sm">
          </div>
        </div>
        <div className="flex bg-[#F4E8FF] py-3 px-5 rounded-lg md:w-1/4 w-full flex-col space-y-2">
          <div className="text-white bg-[#BE86FF] w-max p-3 rounded-full text-xl">
            <FaShoppingBag />
          </div>
          <div className="flex flex-row items-center text-2xl font-bold space-x-5">
            <p className="">{countProduct}</p>
          </div>
          <div className="flex  text-[#576074]">
            <p>Total de productos</p>
          </div>
          <div className="flex  text-blue-500 text-sm">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
