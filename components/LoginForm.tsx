"use client";
import { AuthError } from "@supabase/supabase-js";
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/component";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    toast.loading("Signing in...", { id: "login" });

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message, { id: "login" });
      } else {
        toast.success("Signed in successfully!", { id: "login" });
        router.push("/dashboard");
      }
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "An unexpected error occurred", {
        id: "login",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="my-2">
      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        value={email}
        required
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        value={password}
        required
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-10">
        <Button
          type="submit"
          size="full"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
