"use client";
import Image from "next/image";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center">
      <h2 className="text-4xl font-bold text-gray-100 mb-6">
        Opss Houve um error inesperado!
      </h2>
      <div className="w-1/2 mb-6">
        <Image
          src="/assets/logo.svg"
          alt="Logotipo"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded hover:bg-green-500 transition duration-300"
      >
        Recarregar página
      </button>
    </main>
  );
}
