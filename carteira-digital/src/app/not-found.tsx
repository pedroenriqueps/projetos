import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center">
      <h2 className="text-4xl font-bold text-gray-100 mb-6">
        Página não encontrada
      </h2>
      <p className="text-gray-100 text-lg">Error 404</p>
      <div className="w-1/2 mb-6 flex justify-center">
        <Image src="/assets/logo.svg" alt="Logotipo" width={300} height={300} />
      </div>
      <Link href="/">
        <button className="px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded hover:bg-green-500 transition duration-300">
          Ir para home
        </button>
      </Link>
    </main>
  );
}
