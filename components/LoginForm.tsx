"use client";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/component";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    toast.loading("Signing in...", { id: "login" });

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="my-2">
      <Input
        id="email"
        type="email"
        label="Email address"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
        })}
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
