"use client";

import { useEffect, useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { FaLessThanEqual } from "react-icons/fa6";

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

export default function Agregar({ params }: { params: { productId: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTipo, setTipo] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [precio, setPrecio] = useState<number | string>("");
  const [descuento, setDescuento] = useState<number | string>("");
  const [cantidad, setCantidad] = useState<number | string>("");
  const [color, setColor] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [products, setProducts] = useState<ProductData>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params.productId}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [params.productId]);

  useEffect(() => {
    if (products) {
      setIsLoading(false);
      setName(products.name);
      setPrecio(products.price);
      setDescuento(products.discount);
      setCantidad(products.stock);
      setColor(products.color[0]);
      setDescripcion(products.description);
      setTipo(products.type);
      setImages(products.image.map((img) => img.url));
    }
  }, [products]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const isSelected = (size: string) => selectedSizes.includes(size);

  const toggleSizeTipo = (tipo: string) => {
    setTipo((prevTipo) =>
      prevTipo.includes(tipo)
        ? prevTipo.filter((s) => s !== tipo)
        : [...prevTipo, tipo]
    );
  };

  const isSelectedTipo = (tipo: string) => selectedTipo.includes(tipo);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);

    const fileList = new DataTransfer();
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => fileList.items.add(file));
    }
    files.forEach((file) => fileList.items.add(file));
    setSelectedFiles(fileList.files);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    const fileList = new DataTransfer();
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file, i) => {
        if (i !== index) {
          fileList.items.add(file);
        }
      });
    }
    setSelectedFiles(fileList.files);
  };

  console.log(selectedFiles);

  const handleImageUpload = async () => {
    if (!selectedFiles) {
      setUploadStatus("Please select files to upload");
      return false; // Indicar falla
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    console.log(formData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/products`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`Uploaded successfully: ${data.secureUrls.join(", ")}`);
        setUploadedImages(data.secureUrls); // Actualiza el estado, pero no dependas de él inmediatamente
        return data.secureUrls; // Regresa los URLs de las imágenes
      } else {
        setUploadStatus("Failed to upload files");
        return false; // Indicar falla
      }
    } catch (error) {
      setUploadStatus("Error uploading files");
      return false; // Indicar falla
    }
  };

  const handleProductSubmit = async (imageUrls: string[]) => {
    console.log(imageUrls); // Asegúrate de que los URLs estén disponibles aquí
    if (descuento == "") {
      setDescuento(0);
    }
    const productData = {
      price: parseFloat(precio as string),
      image: imageUrls, // Utiliza los URLs pasados como argumento
      color: [color],
      name: name,
      description: descripcion,
      discount: parseFloat(descuento as string),
      type: selectedTipo,
      stock: parseInt(cantidad as string, 10),
      isActive: true,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params.productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      console.log(response);
      if (response.ok) {
        setUploadStatus("Product uploaded successfully");
        setIsLoading(false);
        setComplete(true);
      } else {
        setUploadStatus("Failed to upload product data");
      }
      console.log(uploadStatus);
    } catch (error) {
      console.log(error);
      setUploadStatus("Error uploading product data");
    }
  };
  console.log(precio);

  const handleSubmit = async () => {
    if (
      (name.length == 0,
      precio == "",
      cantidad == "",
      color.length == 0,
      descripcion.length == 0)
    ) {
      setError(true);
      return;
    }
    if (selectedFiles == null) {
      handleProductSubmit(images);
    }
    setIsLoading(true);
    const imageUrls = await handleImageUpload(); // Espera la subida de imagen y obtén los URLs
    if (imageUrls) {
           handleProductSubmit(imageUrls); // Pasa los URLs combinados a handleProductSubmit
    }
  };
  return (
    <main className="flex h-screen flex-col items-center p-8 mb-8">
      {loading && (
        <div className="fixed inset-0 w-full h-full bg-[#c7c7c76c] z-50 flex justify-center items-center">
          <div className="flex p-8 bg-white flex-col space-y-8 text-center rounded-xl">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {complete && (
        <div className="fixed inset-0 w-full h-full bg-[#c7c7c76c] z-50 flex justify-center items-center">
          <div className="flex p-8 bg-white flex-col space-y-8 text-center rounded-xl">
            <h1 className="text-xl font-bold">
              Producto modificado correctamente
            </h1>
            <div className="flex space-y-4 w-full flex-col text-center">
              <p>El producto {name} se a actualizado</p>
              <p>Para eliminar o modificar el producto diríjase a</p>
              <Link
                href={"/dashboard/productos"}
                className="text-blue-500 hover:text-blue-700"
              >
                productos
              </Link>
            </div>

            <Link
              href={"/dashboard/productos"}
              className="bg-[#D5507C] hover:bg-[#bf486f] py-2 rounded w-full font-bold text-white text-lg mb-8"
            >
              {" "}
              Aceptar
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full space-y-8 ">
        <div className="flex w-full text-xl">
          <h1 className="font-bold">Agregar Producto</h1>
        </div>
        <div className="flex w-full space-x-5 flex-col md:flex-row">
          <div className="flex w-full md:w-1/2 bg-white rounded-xl p-5 flex-col space-y-4">
            <div className="w-full space-y-3">
              <p className="font-bold">Nombre</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nombre del producto"
                className="border-2 border-gray-400 p-3 rounded-lg w-full"
              />
              {error && name.length == 0 && (
                <p className="text-red-400">Coloca un nombre para continua</p>
              )}
            </div>
            <div>
              <div className="flex flex-row w-full space-x-5  ">
                <div className="w-1/2 space-y-3">
                  <p className="font-bold">Precio</p>
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) =>
                      setPrecio(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Precio del producto"
                    className="border-2 border-gray-400 p-3 rounded-lg w-full"
                  />
                  {error && precio == "" && (
                    <p className="text-red-400">Coloca un precio</p>
                  )}
                </div>
                <div className="w-1/2 space-y-3">
                  <p className="font-bold">Descuento</p>
                  <input
                    type="number"
                    value={descuento}
                    onChange={(e) =>
                      setDescuento(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Descuento del producto"
                    className="border-2 border-gray-400 p-3 rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row w-full space-x-5  ">
                <div className="w-1/2 space-y-3">
                  <p className="font-bold">Cantidad</p>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) =>
                      setCantidad(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Stock disponible del producto"
                    className="border-2 border-gray-400 p-3 rounded-lg w-full"
                  />
                  {error && cantidad == 0 && (
                    <p className="text-red-400">Coloca el número de stock</p>
                  )}
                </div>
                <div className="w-1/2 space-y-3">
                  <p className="font-bold">Color</p>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color del producto"
                    className="border-2 border-gray-400 p-3 rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full space-y-3 space-x-3">
              <p className="font-bold">Tipo</p>
              {["Toalla Regular",
                "Toalla Nocturna",
                "Toalla Teen",
                "Pantiprotectores Diarios",
                "Kits"].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => toggleSizeTipo(tipo)}
                  className={`border-2 p-2 w-1/5 rounded-lg ${
                    isSelectedTipo(tipo)
                      ? "bg-[#D5507C] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {tipo}
                </button>
              ))}
              {error && selectedTipo.length == 0 && (
                <p className="text-red-400">Coloca una tipo de toalla</p>
              )}
            </div>
            <div className="w-full space-y-3">
              <p className="font-bold">Descripción</p>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del producto"
                className="border-2 border-gray-400 p-3 rounded-lg w-full h-32"
                style={{ overflow: "hidden" }}
              />
              {error && descripcion.length == 0 && (
                <p className="text-red-400">Coloca una descripcion valida</p>
              )}
            </div>
          </div>
          <div className="flex w-full md:w-1/2 bg-white rounded-xl p-5 flex-col space-y-4">
            <div className="w-full space-y-3">
              <p className="font-bold">Subir imágenes</p>
              <div
                className="border-2 border-dashed border-gray-500 p-5 rounded-lg w-full text-center items-center flex flex-col space-y-3"
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                <div className="text-4xl">
                  <MdOutlineDriveFolderUpload />
                </div>
                <p>Arrastra y suelta las imágenes aquí o</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="fileInput"
                  className="text-blue-500 cursor-pointer"
                >
                  selecciona archivos
                </label>
              </div>
              {error && selectedFiles == null && (
                <p className="text-red-400">Sube por lo menos una imágen</p>
              )}
              <div className="flex flex-wrap space-x-3 space-y-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`uploaded ${index}`}
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 w-8"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <button
            onClick={handleSubmit}
            className="bg-[#D5507C] hover:bg-[#bf486f] py-4 rounded w-full font-bold text-white text-lg mb-8"
          >
            Actualizar producto
          </button>
        </div>
      </div>
    </main>
  );
}
