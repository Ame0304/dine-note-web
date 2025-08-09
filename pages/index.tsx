import Link from "next/link";
import Button from "../components/Button";
import Image from "next/image";
import awardLeft from "../public/award-left.svg";
import awardRight from "../public/award-right.svg";
import Feature from "@/components/Feature";
import Heading from "@/components/Heading";

const features = [
  {
    title: "✨ AI Recipe Generator",
    description:
      "Transform ingredients into culinary magic in seconds. Our AI creates personalized recipes tailored to your taste and dietary preferences.",
    imageUrl: "/ai-recipe.png",
    reverse: false,
    quote: "From ingredients to inspiration — instantly.",
  },
  {
    title: "📸 Recipe Gallery",
    description:
      "Organize, search, and showcase your recipe collection with beautiful visuals and smart categorization.",
    imageUrl: "/recipes.png",
    reverse: true,
    quote: "Your recipes deserve better than a notebook.",
  },
  {
    title: "📅 Meal Planning",
    description:
      "Plan weekly meals with drag-and-drop simplicity. Stay consistent with your goals while adapting to life's surprises.",
    imageUrl: "/meal-plans.png",
    reverse: false,
    quote: "Smart planning, effortless execution.",
  },
  {
    title: "🍳 Share & Order",
    description:
      "Turn your kitchen into a social dining experience. Friends can request their favorites, and you decide what to cook.",
    imageUrl: "/orders.png",
    reverse: true,
    quote: "Your kitchen, their cravings — perfectly matched.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-20 space-y-16">
      {/* Landing page header */}
      <div className="mx-auto max-w-4xl lg:text-center ">
        <span className="text-md font-semibold bg-gradient-to-r from-accent-200 to-primary-900 bg-clip-text text-transparent">
          Make Every Meal Memorable
        </span>
        <Heading level="h0" className="tracking-tight text-pretty mt-6">
          {" "}
          Welcome to{" "}
          <span className="text-primary-900">
            Dine<span className="text-accent-500">Note</span>
          </span>
        </Heading>
        <p className="mt-6 text-lg">
          DineNote is a cozy and intuitive app designed to help you document
          your favorite recipes, plan your meals effortlessly, and even let
          friends &quot;order&quot; from your kitchen. Whether you&apos;re a
          passionate home cook or just starting out, DineNote makes meal
          planning fun and organized!
        </p>
        <div className="flex lg:justify-center items-center gap-2 mt-6">
          <Image src={awardLeft} alt="award left icon" />
          <span className="text-sm text-accent-400 font-semibold lg:text-md">
            Best App Gonna Be
          </span>
          <Image src={awardRight} alt="award right icon" />
        </div>
        <div className="mt-6">
          <Link href="/auth/signup" className="flex justify-center">
            <Button size="large">Get started for free</Button>
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href="/auth/login"
            className="text-lg text-primary-50 hover:underline"
          >
            Already have an account?
            <span className="text-accent-500 hover:text-accent-400 ">
              {" "}
              Log in
            </span>
          </Link>
        </div>
        <div className="mx-auto mt-14 sm:mt-12 lg:mt-18 lg:max-w-4xl rounded-xl">
          <Image
            src="/landing-bg.png"
            alt="Product Overview"
            width={1280}
            height={853}
            quality={100}
            priority
            className="rounded-2xl shadow-lg w-full h-auto"
          />
        </div>

        <hr className="mx-auto mt-12 h-1 w-60 border-0 bg-gradient-to-r from-accent-200 to-primary-900" />
      </div>
      {/* Features section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              reverse={feature.reverse}
              quote={feature.quote}
            />
          ))}
        </div>
      </section>

      <hr className="mx-auto h-1 w-60 border-0 bg-gradient-to-r from-accent-200 to-primary-900" />

      <div className="mx-auto max-w-4xl mt-6">
        <Link href="/auth/signup">
          <Button size="large">Get started for free</Button>
        </Link>
      </div>
    </div>
  );
}
