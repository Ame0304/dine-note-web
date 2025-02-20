import Image from "next/image";
import logo from "../../public/logo.png";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import SignUpForm from "@/components/SignupForm";

export default function SignUpPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center -mt-12">
        <Image
          src={logo}
          height="60"
          quality={100}
          width="60"
          alt="DineNote logo"
        />
        <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-pretty text-primay-100">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm />
        <hr className="my-5 mx-auto h-1 w-60 border-0 bg-accent-500" />
        <GoogleLoginButton />

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-accent-500 hover:text-accent-600"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
