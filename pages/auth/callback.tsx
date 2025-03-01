import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/supabase/component";

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
      <div className="text-center">
        <h2 className="text-xl font-semibold text-primary-100">
          Logging you in...
        </h2>
        <p className="mt-2 text-sm text-accent-500">
          Please wait while we redirect you
        </p>
      </div>
    </div>
  );
}
