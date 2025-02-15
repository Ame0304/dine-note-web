import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

export default function LoginPage() {
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5  placeholder:text-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-semibold text-accent-500 hover:text-accent-600"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5  placeholder:text-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-accent-500 hover:bg-accent-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Do not have an account?{" "}
          <a
            href="#"
            className="font-semibold text-accent-500 hover:text-accent-600"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}
