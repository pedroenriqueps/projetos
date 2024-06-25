export type ComponentProps = {
  children: string;
  htmlFor: string;
};

export const Labels = ({ children, htmlFor }: ComponentProps) => {
  return (
    <label htmlFor={htmlFor} className="text-slate-100 text-sm">
      {children}
    </label>
  );
};
