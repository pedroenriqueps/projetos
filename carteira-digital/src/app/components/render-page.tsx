"use client";
import Graphics from "@/components/graphics/graphics";
import Header from "@/components/header/header";
import ModalRegister from "@/components/modal-forms/register-account/modal-register";
import RenderForms from "@/utils/render-cards/render-cards";
import { useState } from "react";

export default function RenderPage() {
  const [renderForm, setRenderForm] = useState<boolean>(true);
  return (
    <>
      {renderForm === true ? (
        <ModalRegister />
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
