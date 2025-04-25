import { NextPageContext } from "next";
import Link from "next/link";

interface ErrorProps {
  statusCode: number;
  message?: string;
}

function CustomError({ statusCode, message }: ErrorProps) {
  let errorTitle = "Something Went Wrong";
  let errorMessage = message || "An unexpected error occurred";

  if (statusCode === 404) {
    errorTitle = "404 - Page Not Found";
    errorMessage = message || "The page you were looking for doesn't exist.";
  } else if (statusCode === 500) {
    errorTitle = "500 - Server Error";
    errorMessage = message || "Something went wrong on our server.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -m-24">
      <h1 className="text-3xl font-bold text-accent-200">{errorTitle}</h1>
      <p className="mt-4 text-primary-100">{errorMessage}</p>
      <Link href="/" className="mt-6 text-accent-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default CustomError;
