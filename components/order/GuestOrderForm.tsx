import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import RecipeFormLayout from "../recipe/RecipeFormLayout";
import Button from "@/components/Button";
import RecipeFormRow from "../recipe/RecipeFormRow";
import RecipeFormInput from "../recipe/RecipeFormInput";
import RecipeFormTextarea from "../recipe/RecipeFormTextarea";

/*Nest steps:

1.Form submits to guest_orders table
2. Confirmation toast
3. Order display in orders page
- Orders have statuses: "pending" → "accepted" → "added_to_meal_plan" (or "declined")
- Buttons: “Accept and Add to Meal Plan” / “Decline”
4. Once accepted:
- Kitchen owner selects the meal plan date
- Recipe auto-added to that day
- Order marked as “added”

*/

interface GuestOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string;
  recipeTitle?: string;
  userId: string;
}

type OrderFormValues = {
  name: string;
  servings: string;
  date: Date | null;
  note?: string;
  recipeId: string;
  userId: string;
  status: string;
  mealType?: "lunch" | "dinner" | "breakfast" | "snack";
};

export default function GuestOrderForm({
  isOpen,
  onClose,
  recipeId,
  recipeTitle,
  userId,
}: GuestOrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    defaultValues: {
      recipeId: recipeId,
      userId: userId,
      status: "pending", // Set default status
      name: "",
      servings: "",
      date: null,
      note: "",
    },
  });

  const onSubmit: SubmitHandler<OrderFormValues> = (data) => {
    console.log("Form Data:", data);
    reset();
    onClose();
  };

  // Handle closing the form, also reset fields
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <RecipeFormLayout
      isOpen={isOpen}
      onClose={onClose}
      title={`Order ${recipeTitle}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden fields  */}
        <input type="hidden" {...register("recipeId")} />
        <input type="hidden" {...register("userId")} />
        <input type="hidden" {...register("status")} />
        <div className="mt-4 px-4 py-5 rounded-2xl bg-white/80 flex flex-col gap-3">
          <RecipeFormRow label="Name" error={errors.name?.message}>
            <RecipeFormInput
              type="text"
              id="name"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
            />
          </RecipeFormRow>
          <RecipeFormRow label="Servings" error={errors.servings?.message}>
            <RecipeFormInput
              type="number"
              id="servings"
              placeholder="Number of people e.g. 2 (servings)"
              min={1}
              {...register("servings", {
                required: "Number of servings is required",
              })}
            />
          </RecipeFormRow>
          <RecipeFormRow label="Date" error={errors.date?.message}>
            <RecipeFormInput
              type="date"
              id="date"
              {...register("date", { required: "Date is required" })}
            />
          </RecipeFormRow>
          <RecipeFormRow label="Meal Type">
            <select
              id="mealType"
              {...register("mealType")}
              className="mb-2 bg-primary-950 w-full rounded-xl px-3 py-1 sm:text-base/6 font-semibold max-w-108 min-w-40 border-4 border-accent-200/50"
            >
              <option value="dinner" selected>
                Dinner
              </option>
              <option value="lunch">Lunch</option>
              <option value="breakfast">Breakfast</option>
              <option value="snack">Snack</option>
            </select>
          </RecipeFormRow>
          <RecipeFormRow label="Note">
            <RecipeFormTextarea
              id="note"
              placeholder="Add any special instructions or notes"
              {...register("note")}
            />
          </RecipeFormRow>
          <div className="pt-4 flex justify-end gap-5">
            <Button onClick={handleClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Order</Button>
          </div>
        </div>
      </form>
    </RecipeFormLayout>
  );
}
