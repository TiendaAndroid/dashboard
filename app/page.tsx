import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#F4D0CB]">
      <div className="bg-white p-16 rounded-xl items-center flex flex-col space-y-8">
        <h1 className="text-4xl font-bold">Bienvenido al Dashboard de Zazil</h1>
        <Image
          src="/Zazil.jpeg"
          alt="Zazil Logo"
          width={1280}
          height={1280}
          className="rounded-ful m-5 h-[100px] w-[100px]"
        />
        <p className="text-lg">Inicia sesión con tu cuenta de Administrador</p>
        <form className="flex flex-col space-y-8 w-3/4">
          <input
            type="text"
            placeholder="Usuario"
            className="border-2 border-gray-500 p-3 rounded-lg "
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border-2 border-gray-500 p-3 rounded-lg "
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg ">
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
}
