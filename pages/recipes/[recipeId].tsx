import Button from "@/components/Button";
import DeleteRecipe from "@/components/DeleteRecipe";
import ExpandableSection from "@/components/ExpandableSection";
import Heading from "@/components/Heading";
import IngredientRow from "@/components/IngredientRow";
import Tag from "@/components/Tag";
import TriedBadge from "@/components/TriedBadge";
import Image from "next/image";

import { useRouter } from "next/router";

function RecipeDetail() {
  const router = useRouter();
  const recipe = {
    id: String(router.query.recipeId),
    title: "Delicious Pasta Carbonara",
    image: "/default-recipe.png",
    tried: true,
    description:
      "A delicious and creamy pasta dish that is ready in 30 minutes. Perfect for a quick weeknight dinner.",
    categories: [
      { name: "Italian", color: "purple" },
      { name: "Pasta", color: "green" },
      { name: "Quick", color: "red" },
      { name: "30 min", color: "orange" },
    ],
    ingredients: [
      { name: "spagetti", quantity: "400g" },
      { name: "pancetta", quantity: "200g" },
      { name: "eggs", quantity: "4" },
      { name: "Parmesan cheese", quantity: "100g" },
      { name: "garlic", quantity: "2 cloves" },
      { name: "fresh parsley", quantity: "1 bunch" },
      { name: "olive oil", quantity: "300 ml" },
    ],
    steps: [
      {
        step: 1,
        text: "Boil water and cook pasta according to package instructions.",
      },
      { step: 2, text: "Cook pancetta in a pan until crispy." },
      { step: 3, text: "Whisk eggs and cheese in a bowl." },
      { step: 4, text: "Drain pasta and add to the pancetta." },
      { step: 5, text: "Stir in egg mixture and cook until creamy." },
      { step: 6, text: "Season with salt and pepper. Serve with parsley." },
    ],
  };

  return (
    <div className="container mx-auto sm:max-w-6xl">
      {/* Back button */}
      <Button onClick={() => router.push("/recipes")}>Back to recipes</Button>
      <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
        {/* Overview card*/}
        <div className="mx-auto md:w-1/3 w-full">
          <div className="relative">
            {/* Background Image */}
            <div className="h-48 w-full rounded-t-2xl overflow-hidden relative">
              <Image
                src="/detail-bg.png"
                alt="Recipe background image"
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 40vw, (min-width: 768px) 90vw, 100vw"
              />
            </div>

            {/* Recipe Overview Card */}
            <div className="bg-white shadow-lg p-6 relative -mt-12 border-2 border-accent-200 rounded-2xl">
              {/* Round Recipe Image */}
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-accent-200 shadow-xl shadow-primary-900">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Recipe Overview Content */}
              <div className="pt-24">
                <div className="flex flex-col justify-bwtween items-center gap-4">
                  <Heading level="h4" className="text-center">
                    {recipe.title}
                  </Heading>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {recipe.categories.map((category) => (
                      <Tag key={category.name} color={category.color}>
                        {category.name}
                      </Tag>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="bg-primary-950 p-4 rounded-xl">
                    <Heading level="h5" className="text-accent-200">
                      📝 Description
                    </Heading>
                    <p className="mt-2 text-sm">{recipe.description}</p>
                  </div>

                  {/* Recipe Actions */}
                  <div className="flex justify-center items-center gap-3">
                    <Button variant="outline">Share</Button>
                    <Button variant="outline">Edit</Button>
                    <DeleteRecipe
                      id={recipe.id}
                      title={recipe.title}
                      buttonVariant="outline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Ingredients,steps & note */}
        <div className="bg-primary-950 rounded-2xl md:w-2/3 shadow-lg p-6 mx-auto w-full border-2 border-accent-200">
          <TriedBadge tried={recipe.tried} id={recipe.id} />
          <div className="text-center">
            <Heading level="h3" styled={true} className="text-accent-200">
              Recipe Details
            </Heading>
          </div>

          {/* Ingredients */}
          <ExpandableSection icon="🥔" title="Ingredients">
            <div className="flex flex-col gap-3 w-full">
              {recipe.ingredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient.name}
                  name={ingredient.name}
                  quantity={ingredient.quantity}
                />
              ))}
            </div>
          </ExpandableSection>
          {/* Steps */}
          <ExpandableSection icon="🥘" title="Steps">
            {/* Steps with number markers */}

            {recipe.steps.map((step) => (
              <div
                key={step.step}
                className="flex justify-start items-center mb-6 last:mb-0"
              >
                {/* Circle marker */}
                <div className="w-7 h-7 border-2 border-accent-200 rounded-full shadow-md shadow-accent-500 shrink-0">
                  <div className="text-md text-center">{step.step}</div>
                </div>

                {/* Step content */}
                <p className="text-gray-700 ml-2 lg:ml-5">{step.text}</p>
              </div>
            ))}
          </ExpandableSection>
          {/* Note */}
          <ExpandableSection icon="✨" title="Note">
            <p>
              This recipe is a family favorite and can be easily customized with
              your favorite ingredients.
            </p>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
