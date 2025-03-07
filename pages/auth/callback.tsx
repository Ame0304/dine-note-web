import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/supabase/component";
import Loading from "@/components/Loading";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Listens for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push("/dashboard"); // Redirect to dashboard
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loading message="Logging you in..." size="large" fullPage={true} />
    </div>
  );
}
