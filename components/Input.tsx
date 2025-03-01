interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="text-primary-100 block w-full rounded-md bg-primary-950 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-500 sm:text-sm/6 max-w-80 shadow-md shadow-primary-900"
    />
  );
}
