interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`block w-full ${props.className} rounded-md  ${
        props.disabled
          ? "bg-accent-200 text-primary-50 line-through"
          : "bg-primary-950"
      } px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-500 sm:text-sm/6 min-w-40 shadow-md shadow-primary-900`}
    />
  );
}
