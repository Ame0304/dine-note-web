import Image from "next/image";
import logo from "../../public/logo.png";
import LoginForm from "@/components/LoginForm";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center -mt-12">
        <Link href="/">
          <Image
            src={logo}
            height="60"
            quality={100}
            width="60"
            alt="DineNote logo"
          />
        </Link>
        <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-pretty text-primay-100">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <hr className="my-5 mx-auto h-1 w-60 border-0 bg-accent-500" />
        <GoogleLoginButton />

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Do not have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-accent-500 hover:text-accent-600"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
