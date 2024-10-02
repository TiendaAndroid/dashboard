"use client";
import BarChart from "@/components/BarChart";
import Card from "@/components/cards";
import ProductsList from "@/components/ProductsList";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center p-8 space-y-8">
      <div className="flex w-full text-xl">
        <h1 className="font-bold">Panel de administración</h1>
      </div>
      <div className="flex w-full space-x-3">
        <Card />
      </div>
      <div className="flex w-full space-x-5 mb-8">
        <div className="flex w-1/2 bg-white rounded-xl p-5 justify-center items-center shadow-md">
          <BarChart />
        </div>
        <div className="flex flex-col w-1/2 h-max bg-white rounded-md shadow-md">
          <ProductsList />
        </div>
      </div>
    </main>
  );
}
