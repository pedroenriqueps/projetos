"use client";
import Graphics from "@/components/graphics/graphics";
import Header from "@/components/header/header";
import ModalLogin from "@/components/modal-forms/login-account/modal-login";
import RenderForms from "@/utils/render-cards/render-cards";
import { useAuth } from "@/context/render-forms/render-forms";
import { ToastContainer } from "react-toastify";
export default function RenderPage() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <ToastContainer />
      {isLoggedIn === true ? (
        <ModalLogin />
      ) : (
        <div>
          <section>
            <Header />
          </section>
          <section>
            <Graphics />
          </section>
          <section className="flex justify-around w-11/12 mx-auto my-12">
            <RenderForms />
          </section>
        </div>
      )}
    </>
  );
}
