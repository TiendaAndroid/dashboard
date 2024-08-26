"use client";
import { useEffect, useState } from "react";

interface ProductData {
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

const Card = ({ type }: { type: string }) => {
  const [products, setProducts] = useState<ProductData[]>([]);

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
    <div className="flex bg-white p-5 rounded-xl w-1/4 flex-col space-y-3">
      <div className="flex flex-row space-x-8">
        <p>{type}</p>
        <p className="text-green-500">+20% ↑</p>
      </div>
      <p className="text-2xl">{type === "Productos" ? products.length : 100}</p>
    </div>
  );
};

export default Card;
