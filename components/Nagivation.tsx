import Link from "next/link";

export default function Nagivation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/recipes"
            className="hover:text-accent-400 transition-colors"
          >
            Recipes
          </Link>
        </li>
        <li>
          <Link
            href="/meal-plans"
            className="hover:text-accent-400 transition-colors"
          >
            Meal Plans
          </Link>
        </li>
        <li>
          <Link
            href="/order"
            className="hover:text-accent-400 transition-colors"
          >
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
}
