interface FormRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormRowHorizontal({
  label,
  error,
  children,
  ...props
}: FormRowProps) {
  return (
    <div className="py-3 border-b border-accent-500/50 last:border-b-0">
      <div
        className="grid gap-3
        grid-cols-1 sm:grid-cols-[auto_1fr_auto]
      items-baseline sm:items-center"
      >
        <label
          htmlFor={props.id}
          className="block text-sm/6 font-medium w-36 sm:justify-self-end"
        >
          {label}
        </label>
        {children}
        {error && (
          <p className="text-sm text-primary-500 xs:justify-self-start xs:col-start-2 xs:col-end-4 xs:row-start-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
