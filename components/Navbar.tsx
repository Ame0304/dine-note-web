import Logo from "./Logo";
import Navigation from "./Nagivation";

export default function Navbar() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
        <div className="flex gap-4">
          <button className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-md text-accent-50">
            Login
          </button>
          <button className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-md text-accent-50">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
