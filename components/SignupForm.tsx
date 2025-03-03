"use client";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/component";

import FormRow from "@/components/FormRow";
import Button from "@/components/Button";
import Input from "./Input";

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

  // Make sure the password and confirmPassword fields match in real-time
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
      <FormRow label="Full Name" error={errors.fullName?.message} id="fullName">
        <Input
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Full name must be at least 2 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message} id="email">
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password" error={errors.password?.message} id="password">
        <Input
          id="password"
          type="password"
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
      </FormRow>

      <FormRow
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        id="confirmPassword"
      >
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
      </FormRow>

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
