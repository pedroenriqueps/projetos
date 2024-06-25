import FormCard from "../components/form-expenses-earnings/form-expenses-earnings";

export type PropsComponent = {
  title: string;
  typeComponent: string;
  placeholderInputValue?: string;
  placeholderInputDescrioption?: string;
};

export default function CardLayout({
  title = "",
  typeComponent = "",
  placeholderInputValue = "",
  placeholderInputDescrioption = "",
}: PropsComponent) {
  return (
    <>
      <div className="bg-gray-900 py-8 px-6 rounded-lg min-w-[384px] shadow-xl">
        <h2 className="pb-6 text-slate-50 font-extrabold text-xl">{title}</h2>

        <FormCard
          typeComponent={typeComponent}
          placeholderInputValue={placeholderInputValue}
          placeholderInputDescrioption={placeholderInputDescrioption}
        />
      </div>
    </>
  );
}
