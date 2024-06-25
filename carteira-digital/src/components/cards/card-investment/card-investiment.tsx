import FormInvestiment from "../components/form-investiment/form.-investiment";

export type PropsComponet = {
  title: string;
};
export default function CardInvestiment({ title }: PropsComponet) {
  return (
    <>
      <div className="bg-gray-900 py-8 px-6 rounded-lg min-w-[384px] shadow-xl">
        <h2 className="pb-6 text-slate-50 font-extrabold text-xl">{title}</h2>
        <FormInvestiment />
      </div>
    </>
  );
}
