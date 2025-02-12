import Link from "next/link";
import Button from "../components/Button";
import Image from "next/image";
import bg from "../public/bg.jpeg";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl lg:text-center">
      <h2 className="text-md font-semibold text-primary-500">Dine Happier</h2>
      <p className="mt-2 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-pretty text-primay-100">
        Welcome to <span className="text-accent-500">DineNote</span>
      </p>
      <p className="mt-6 text-lg text-primary-100">
        Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
        Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
        mi viverra elit nunc.
      </p>
      <div className="mt-6">
        <Button size="large">Get Started Now</Button>
      </div>
      <div className="mt-6">
        <Link href="/" className="text-lg text-primary-50 hover:underline">
          Already have an account?
          <span className="text-accent-500 "> Log in</span>
        </Link>
      </div>
      <div className="mx-auto mt-12 max-w-lg sm:mt-18 lg:mt-24 lg:max-w-4xl">
        <Image
          src={bg}
          alt="product screenshot"
          className="w-full rounded-xl ring-1 shadow-2xl ring-accent-100"
        />
      </div>
    </div>
  );
}
