import Image from "next/image";
import { FaShoppingBag, FaUserFriends } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { MdAutoGraph } from "react-icons/md";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="bg-white p-5 rounded-xl items-center flex flex-col space-y-8 h-full w-full">
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

        <Link href={"/dashboard"} className="flex flex-row items-center space-x-4 hover:bg-slate-100 w-full p-3 rounded-xl">
          <MdSpaceDashboard />
          <p>Panel</p>
        </Link>

        <Link href={"/dashboard/productos"} className="flex flex-row items-center space-x-4  hover:bg-slate-100 w-full p-3 rounded-xl">
          <FaShoppingBag />
          <p>Productos</p>
        </Link>

        <div className="flex flex-row items-center space-x-4  hover:bg-slate-100 w-full p-3 rounded-xl">
          <FaUserFriends />
          <p>Usuarios</p>
        </div>

        <div className="flex flex-row items-center space-x-4  hover:bg-slate-100 w-full p-3 rounded-xl">
          <PiNewspaperClippingFill />
          <p>Ordenes</p>
        </div>

        <div className="flex flex-row items-center space-x-4  hover:bg-slate-100 w-full p-3 rounded-xl">
          <MdAutoGraph />
          <p>Datos</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
