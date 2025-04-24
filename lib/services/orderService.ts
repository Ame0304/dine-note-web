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

export interface Order {
  id: string;
  guest_name: string;
  servings: number;
  date: string;
  meal_type: string;
  note?: string;
  status: string;
  recipe: {
    id: string;
    title: string;
    imageUrl: string;
  };
}

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

export async function getOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*,recipes(id,title,imageUrl)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }

  const orders = data.map((order) => ({
    ...order,
    servings: order.servings || 0,
    date: order.date || "",
    recipe: {
      id: order.recipes.id,
      title: order.recipes.title,
      imageUrl: order.recipes.imageUrl,
    },
  }));

  return orders;
}

export async function updateOrderStatus(
  orderId: string,
  status: "accepted" | "declined"
) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}
