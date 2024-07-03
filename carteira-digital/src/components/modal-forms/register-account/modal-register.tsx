"use client";
import { InputForm } from "@/hooks/inputs/input-form";
import * as yup from "yup";
import { Labels } from "@/hooks/labels/labels";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Createuser } from "@/api/services/post-connect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/render-forms/render-forms";
type FormProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  username: yup.string().required("O nome de usuário é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
    .required("A confirmação de senha é obrigatória"),
});

export default function ModalRegister() {
  const router = useRouter();
  const { setLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleChange = async (data: FormProps) => {
    try {
      await Createuser(data);
      toast.success("Usuário registrado com sucesso!");
      //window.location.reload();
      setLoggedIn(false);
      router.push("http://localhost:3000");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("Este usuário já está cadastrado.");
      } else {
        toast.error(`Erro: ${error.message || "Erro desconhecido"}`);
      }
    }
  };

  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username.message);
    } else if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.password) {
      toast.error(errors.password.message);
    } else if (errors.confirmPassword) {
      toast.error(errors.confirmPassword.message);
    }
  }, [errors]);

  return (
    <>
      <dialog
        open
        className="bg-slate-900 p-4 rounded-md flex items-center justify-center min-h-screen mx-auto w-full backdrop-blur-3xl"
      >
        <form
          method="post"
          onSubmit={handleSubmit(handleChange)}
          className="flex flex-col w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl text-white mb-4 text-center">Registre-se</h2>
          <div className="flex flex-col mb-2">
            <Labels htmlFor="username">Username</Labels>
            <InputForm
              type="text"
              register={register}
              registerProp="username"
              className="bg-slate-800 text-slate-100 border border-slate-700 p-2 rounded"
              placeholder="Escolha um nome"
            />
          </div>
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
          <div className="flex flex-col mb-2">
            <Labels htmlFor="confirmPassword">Repita a senha</Labels>
            <InputForm
              type="password"
              register={register}
              registerProp="confirmPassword"
              className="bg-slate-800 text-slate-100 border border-slate-700 p-2 rounded"
              placeholder="Repita a senha escolhida"
            />
          </div>
          <div className="mb-4 text-slate-400">
            <p>
              Já tem conta?{" "}
              <Link href="/auth/login" className="text-green-500 underline">
                Fazer login
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="text-white bg-green-500 p-4 rounded-lg w-full"
          >
            Registrar-se
          </button>
        </form>
      </dialog>
    </>
  );
}
