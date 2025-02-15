"use client";
import { AuthError } from "@supabase/supabase-js";

import Link from "next/link";
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium">
            Password
          </label>
          <div className="text-sm">
            <Link
              href="#"
              className="font-semibold text-accent-500 hover:text-accent-600"
            >
              Forgot password?
            </Link>
          </div>
        </div>
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
          Sign in
        </button>
      </div>
    </form>
  );
}
