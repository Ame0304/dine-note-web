import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";

import { createClient } from "@/lib/supabase/server-props";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return {
    props: {
      user: data.user,
    },
  };
}

export default function Dashboard({ user }: { user: User }) {
  return <h1>Welcome to your kitchen, {user?.user_metadata.full_name}!</h1>;
}
