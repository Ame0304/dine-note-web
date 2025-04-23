import { createClient } from "../supabase/component";

export type OrderFormValues = {
  guest_name: string;
  servings: string;
  date: Date | null;
  note?: string;
  recipeId: string;
  userId: string;
  status: string;
  mealType?: "lunch" | "dinner" | "breakfast" | "snack";
};

const supabase = createClient();

export async function createOrder(orderData: OrderFormValues) {
  const { error } = await supabase.from("orders").insert({
    recipe_id: orderData.recipeId,
    user_id: orderData.userId,
    meal_type: orderData.mealType,
    guest_name: orderData.guest_name,
    servings: orderData.servings,
    date: orderData.date,
    note: orderData.note,
    status: orderData.status,
  });

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
