import React from "react";

export default function Error({ message }: { message: string }) {
  return <p className="text-red-500 text-center">{message}</p>;
}
