"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: usuario, password }),
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      console.log("Login exitoso:", data);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      setError(true);
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white p-16 rounded-xl items-center flex flex-col space-y-5">
        <h1 className="text-4xl font-bold">Bienvenido a Zazil</h1>
        <Image
          src="/Zazil.jpeg"
          alt="Zazil Logo"
          width={1280}
          height={1280}
          className="rounded-full m-5 h-[100px] w-[100px] object-contain"
        />
        <p className="text-lg">Inicia sesión con tu cuenta de Administrador</p>
        <form className="flex flex-col space-y-8 w-3/4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
            className="border-2 border-gray-500 p-2 rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="border-2 border-gray-500 p-2 rounded-lg"
          />

          {error && (
            <div className="flex w-full justify-center">
              <p className="text-red-500">Usuario o contraseña incorrectos</p>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
}
