import { createClient } from "@/lib/supabase/component";
export interface Category {
  id: number;
  name: string;
}

const supabase = createClient();

export async function getCategories(userId: string | undefined) {
  if (!userId) {
    return [];
  }
  const { data, error } = await supabase.rpc("get_user_categories", {
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
