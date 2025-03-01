import React from "react";

interface FileInputProps {
  id: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function FileInput({
  accept = "image/*",
  onChange,
  isLoading = false,
  children,
  id,
  ...props
}: FileInputProps) {
  return (
    <div className="inline-block">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
        id={id}
        disabled={isLoading}
        {...props}
      />
      <label
        htmlFor={id}
        className="cursor-pointer inline-block bg-accent-500 text-white hover:bg-accent-400 px-3 py-2 text-base rounded-md shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {children}
      </label>
    </div>
  );
}
