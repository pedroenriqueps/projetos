"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Labels } from "@/hooks/labels/labels";
import { InputForm } from "@/hooks/inputs/input-form";
import Link from "next/link";
import { SearchLogin } from "@/api/services/post-connect";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/render-forms/render-forms";
import * as Yup from "yup";

interface FormInput {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

export default function ModalLogin() {
  const { setLoggedIn } = useAuth();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });
  const router = useRouter();

  const handleLogin = async (data: FormInput) => {
    try {
      await SearchLogin(data);
      setLoggedIn(false);
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Email ou senha inválido");
      } else {
        toast.error("Houve um erro inesperado!");
      }
    }
  };

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors]);

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowInfoModal(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-slate-900 p-4 rounded-md flex items-center justify-center min-h-screen mx-auto w-full backdrop-blur-3xl">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col relative w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl"
        >
          <div className="absolute right-10">
            <div
              className="text-slate-50 cursor-pointer"
              onClick={handleInfoClick}
            >
              <span>?</span>
            </div>
            {showInfoModal && (
              <div
                onClick={handleCloseModal}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div
                  className="bg-slate-800 text-slate-100 border border-slate-700 p-4 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>Cadastre-se para ter acesso ao site</p>
                </div>
              </div>
            )}
          </div>
          <h2 className="text-2xl text-white mb-4 text-center">Login</h2>
          <div className="flex flex-col mb-2">
            <Labels htmlFor="email">Email</Labels>
            <InputForm
              type="email"
              register={register}
              registerProp="email"
              className="bg-slate-800 text-slate-100 border border-slate-700 p-2 rounded"
              placeholder="Escolha seu melhor email"
            />
          </div>
          <div className="flex flex-col mb-2">
            <Labels htmlFor="password">Senha</Labels>
            <InputForm
              type="password"
              register={register}
              registerProp="password"
              className="bg-slate-800 text-slate-100 border border-slate-700 p-2 rounded"
              placeholder="Escolha uma senha"
            />
          </div>
          <div className="mb-4 text-slate-400">
            <p>
              Não tem conta?{" "}
              <Link href="/auth/register" className="text-green-500 underline">
                Fazer cadastro
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="text-white bg-green-500 p-4 rounded-lg w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
