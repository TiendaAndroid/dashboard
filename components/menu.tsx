"use client";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBagHandleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdOutlineLeaderboard } from "react-icons/md";

const Menu = () => {
  const currentPath = usePathname();
  return (
    <div className="bg-white p-5 rounded-r-lg items-center flex flex-col space-y-8 h-full w-full shadow-md">
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex  justify-center">
          <Image
            src="/Zazil.jpeg"
            alt="Zazil Logo"
            width={1280}
            height={1280}
            className="rounded-full h-[100px] w-[100px]"
          />
        </div>

        <Link
          href={"/dashboard"}
          className={`flex flex-row items-center space-x-4 w-full p-3 rounded-md font-light ${
            currentPath === "/dashboard"
              ? "bg-[#D5507C] text-white"
              : "hover:bg-[#D5507C] hover:text-white"
          }`}
        >
          <p className="text-2xl">
            <MdOutlineSpaceDashboard />
          </p>

          <p>Panel</p>
        </Link>

        <Link
          href={"/dashboard/productos"}
          className={`flex flex-row items-center space-x-4 w-full p-3 rounded-md font-light ${
            currentPath === "/dashboard/productos"
              ? "bg-[#D5507C] text-white"
              : "hover:bg-[#D5507C] hover:text-white"
          }`}
        >
          <p className="text-2xl">
            <IoBagHandleOutline />
          </p>

          <p>Productos</p>
        </Link>

        <Link
          href={"/dashboard/usuarios"}
          className={`flex flex-row items-center space-x-4 w-full p-3 rounded-md font-light ${
            currentPath === "/dashboard/usuarios"
              ? "bg-[#D5507C] text-white"
              : "hover:bg-[#D5507C] hover:text-white"
          }`}
        >
          <p className="text-2xl">
            <FiUser />
          </p>
          <p>Usuarios</p>
        </Link>

        <Link
          href={"/dashboard/ordenes"}
          className={`flex flex-row items-center space-x-4 w-full p-3 rounded-md font-light ${
            currentPath === "/dashboard/ordenes"
              ? "bg-[#D5507C] text-white"
              : "hover:bg-[#D5507C] hover:text-white"
          }`}
        >
          <p className="text-2xl">
            <BsCart3 />
          </p>
          <p>Ordenes</p>
        </Link>

        <div className="flex flex-row items-center space-x-4  hover:bg-slate-100 w-full p-3 rounded-xl">
          <p className="text-2xl">
            <MdOutlineLeaderboard />
          </p>
          <p>Datos</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
