interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="my-2">
      <label htmlFor={props.id} className="block text-sm/6 font-medium">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          className="block w-full rounded-md bg-white px-3 py-1.5 placeholder:text-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
        />
      </div>
      {error && <p className="mt-1 text-sm text-primary-500">{error}</p>}
    </div>
  );
}
