import { createClient } from "@/lib/supabase/component";

interface UpdateUserParams {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}

export async function updateUser({
  password,
  fullName,
  avatar,
}: UpdateUserParams) {
  const supabase = createClient();
  // 1. Update password OR fullName
  let updateData = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { full_name: fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Date.now()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  // 3. Update avatar in the user
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar_url: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
