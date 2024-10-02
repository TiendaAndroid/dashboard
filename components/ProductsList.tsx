"useClient";
import { ProductInterface } from "@/interfaces/Products";
import { useEffect, useState } from "react";

const ProductsList = () => {

  const [products, setProducts] = useState<ProductInterface[]>([]);

  const getColor = (index: number) => {
    const colors = ["bg-[#FA587E]", "bg-[#FD9577]", "bg-[#39D957]"];
    return colors[index % colors.length];
  };

  const getColorLabel = (index: number) => {
    const colors = ["text-[#FA587E] bg-[#FFE2E6] border-[#FA587E]", "text-[#FD9577] border-[#FD9577] bg-[#FFF4DE]", "text-[#39D957] border-[#39D957] bg-[#DCFCE7]"];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/top`);
        const data = await response.json();
        if (Array.isArray(data.topProducts)) {
          setProducts(data.topProducts);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="h-full p-5 space-y-3 shadow-md rounded-md">
      <p className="font-bold text-[#06004E] text-xl">
        Los mejores 5 productos
      </p>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Popularidad
              </th>
              <th scope="col" className="px-6 py-3">
                Ventas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{data.name}</td>
                <td className="flex px-6 py-4 items-center justify-center">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div
                      className={`h-1.5 rounded-full dark:bg-gray-300 ${getColor(
                        index
                      )}`}
                      style={{
                        width: `${
                          (data.sales * 100) / (data.stock + data.sales)
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={` border-1 w-max px-2 py-1 rounded-md ${getColorLabel(
                        index
                      )}`}>
                    {(data.sales * 100) / (data.stock + data.sales)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
