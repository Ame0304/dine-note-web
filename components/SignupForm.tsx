"use client";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/component";

import Input from "@/components/Input";
import Button from "@/components/Button";

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    toast.loading("Signing up...", { id: "signup" });

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
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
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <Input
        id="fullName"
        label="Full Name"
        error={errors.fullName?.message}
        {...register("fullName", {
          required: "Full name is required",
          minLength: {
            value: 2,
            message: "Full name must be at least 2 characters",
          },
        })}
      />

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
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
          },
        })}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
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
