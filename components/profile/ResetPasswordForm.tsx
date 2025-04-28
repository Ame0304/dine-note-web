import React from "react";
import Button from "../Button";
import FormRowHorizontal from "../FormRowHorizontal";
import Heading from "../Heading";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { updateUser } from "../../lib/services/userService";
import toast from "react-hot-toast";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>();

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!data) return;

    try {
      await updateUser({ password: data.password });
      toast.success("Password updated successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
    }
  };
  return (
    <form
      className="mt-5 space-y-2 flex flex-col justify-between p-10 rounded-xl bg-white/70"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <Heading level="h3">Reset Password</Heading>

      <FormRowHorizontal label="New Password" error={errors.password?.message}>
        <Input
          placeholder="Reset password"
          className="max-w-80"
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
      </FormRowHorizontal>
      <FormRowHorizontal
        label="Confirm Password"
        error={errors.confirmPassword?.message}
      >
        <Input
          placeholder="Confirm Password"
          className="max-w-80"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
      </FormRowHorizontal>
      <div className="mt-10 flex justify-end space-x-5">
        <Button size="regular" type="submit" isLoading={isSubmitting}>
          Reset
        </Button>
      </div>
    </form>
  );
}
