"use client";
import { AuthError } from "@supabase/supabase-js";

import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/component";

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
    <form onSubmit={handleSubmit} method="POST" className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm/6 font-medium">
          Full Name
        </label>

        <div className="mt-2">
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            required
            autoComplete="name"
            className="block w-full rounded-md bg-white px-3 py-1.5  placeholder:text-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5  placeholder:text-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium">
          Password
        </label>

        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5  placeholder:text-primary-100 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-accent-500 hover:bg-accent-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          disabled={isSubmitting}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
