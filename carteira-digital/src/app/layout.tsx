import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/render-forms/render-forms";
const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Carteira | home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <html lang="en">
        <body className={`${inter.className} bg-slate-800 text-slate-100`}>
          <ToastContainer />
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </>
  );
}
