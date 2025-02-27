interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormRow({
  label,
  error,
  children,
  ...props
}: InputProps) {
  return (
    <div className="my-2">
      <label htmlFor={props.id} className="block text-sm/6 font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-sm text-primary-500">{error}</p>}
    </div>
  );
}
