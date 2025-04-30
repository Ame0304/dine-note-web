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
      "Unleash your creativity with our AI-powered recipe generator. Just input your ingredients, and let the magic happen! ",
    imageUrl: "/ai-recipe.png",
    reverse: false,
    quote: "Get personalized recipes that suit your taste and needs.",
  },
  {
    title: "📸 Recipe Gallery",
    description:
      "A curated collection of your masterpieces. Easily browse, search, and organize recipes with categories, tags, and images that spark joy.",
    imageUrl: "/recipes.png",
    reverse: true,
    quote: "Because your recipes deserve more than a spreadsheet.",
  },
  {
    title: "📅 Meal Planning",
    description:
      "Plan your week with ease. Select and add meals onto your calendar and stay consistent with your dietary goals. Whether it’s a busy week or a special occasion, we’ve got you covered.",
    imageUrl: "/meal-plans.png",
    reverse: false,
    quote: "From spontaneous cravings to structured goals — plan it all.",
  },
  {
    title: "👩‍🍳 Share & Order",
    description:
      "Let friends “place an order” from your personal menu. Whether it’s for a cozy dinner or weekend brunch, guests can request meals and you can accept with a click.",
    imageUrl: "/orders.png",
    reverse: true,
    quote: "Turn your kitchen into a pop-up restaurant for friends.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-20 space-y-16">
      {/* Landing page header */}
      <div className="mx-auto max-w-4xl lg:text-center ">
        <span className="text-md font-semibold text-accent-500">
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
          friends “order” from your kitchen. Whether you&apos;re a passionate
          home cook or just starting out, DineNote makes meal planning fun and
          organized!
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
            height={720}
            quality={100}
            priority
            className="rounded-2xl shadow-lg"
          />
        </div>

        <hr className="mx-auto mt-12 h-1 w-60 border-0 bg-accent-500" />
      </div>
      {/* Features section */}
      <section className="mx-auto max-w-4xl lg:max-w-6xl space-y-16">
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
      </section>

      <hr className="mx-auto h-1 w-60 border-0 bg-accent-500" />

      <div className="mx-auto max-w-4xl mt-6">
        <Link href="/auth/signup">
          <Button size="large">Get started for free</Button>
        </Link>
      </div>
    </div>
  );
}
