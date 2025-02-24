"use client";
import { AuthError } from "@supabase/supabase-js";

import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/component";

import Input from "@/components/Input";
import Button from "@/components/Button";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    toast.loading("Signing up...", { id: "signup" });

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message, { id: "signup" });
      } else {
        toast.success("Signed up successfully!", { id: "signup" });
        router.push("/dashboard");
      }
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "An unexpected error occurred", {
        id: "signup",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <Input
        id="fullName"
        name="fullName"
        type="text"
        label="Full Name"
        value={fullName}
        required
        autoComplete="name"
        onChange={(e) => setFullName(e.target.value)}
      />

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
          Sign up
        </Button>
      </div>
    </form>
  );
}
