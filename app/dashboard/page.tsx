"use client";
import BarChart from "@/components/BarChart";
import Card from "@/components/cards";
import ProductsList from "@/components/ProductsList";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center p-8 bg-gray-200 space-y-8">
      <div className="flex w-full text-xl">
        <h1 className="font-bold">Dashboard</h1>
      </div>
      <div className="flex w-full space-x-5">
        <Card type="Compras" />
        <Card type="Usuarios" />
        <Card type="Productos" />
        <Card type="Ingresos" />
      </div>
      <div className="flex w-full space-x-5">
        <div className="flex w-1/2 bg-white rounded-xl p-5 justify-center items-center">
          <BarChart />
        </div>
        <div className="flex flex-col w-1/2 bg-white rounded-xl">
          <ProductsList/>
        </div>
      </div>
    </main>
  );
}
