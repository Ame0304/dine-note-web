interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function RecipeFormInput({ ...props }: InputProps) {
  return (
    <input
      {...props}
      type={props.type}
      id={props.id}
      className="mb-2 bg-primary-950 block w-full rounded-xl px-3 py-1 sm:text-base/6 font-semibold max-w-108 min-w-40 border-4 border-accent-200/50 overflow-x-scroll"
    />
  );
}
