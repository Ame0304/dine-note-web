import Link from "next/link";
import Button from "../components/Button";
import Image from "next/image";
import bg from "../public/bg.jpg";
import awardLeft from "../public/award-left.svg";
import awardRight from "../public/award-right.svg";
import Feature from "@/components/Feature";
import Heading from "@/components/Heading";

const features = [
  {
    title: "🥗 Recipe Collection",
    description:
      "Easily save and categorize your favorite recipes. Add notes, track which dishes you’ve tried, and revisit them anytime.",
    imageUrl: "/feature-1.png",
    reverse: false,
  },
  {
    title: "📅 Meal Planning",
    description:
      "Plan your meals for the week, organize ingredients, and stay on track with your diet effortlessly.",
    imageUrl: "/feature-2.jpg",
    reverse: true,
  },
  {
    title: "👩‍🍳 Share with Friends",
    description:
      "Invite friends to try your recipes, share meal ideas, and even take ‘orders’ for homemade meals.",
    imageUrl: "/feature-3.png",
    reverse: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-20 space-y-16">
      {/* Landing page header */}
      <div className="mx-auto max-w-4xl lg:text-center ">
        <span className="text-md font-semibold text-primary-500">
          Make Every Meal Memorable
        </span>
        <Heading level="h0" className="tracking-tight text-pretty mt-6">
          {" "}
          Welcome to <span className="text-accent-500">DineNote</span>
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
          <span className="text-sm text-primary-700 font-semibold lg:text-md">
            Best App Gonna Be
          </span>
          <Image src={awardRight} alt="award right icon" />
        </div>
        <div className="mt-6">
          <Link href="/auth/signup">
            <Button size="large">Get started for free</Button>
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href="/auth/login"
            className="text-lg text-primary-50 hover:underline"
          >
            Already have an account?
            <span className="text-accent-500 "> Log in</span>
          </Link>
        </div>
        <div className="mx-auto mt-14 sm:mt-12 lg:mt-18 lg:max-w-4xl outline outline-primary-700/50 outline-offset-4 rounded-xl">
          <Image
            src={bg}
            alt="Product Overview"
            width={1280}
            height={720}
            className="w-full rounded-xl ring-1 shadow-2xl ring-accent-100"
          />
        </div>

        <hr className="mx-auto mt-12 h-1 w-60 border-0 bg-accent-500" />
      </div>
      {/* Features section */}
      <section className="mx-auto max-w-4xl lg:max-w-none space-y-16">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            reverse={feature.reverse}
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
