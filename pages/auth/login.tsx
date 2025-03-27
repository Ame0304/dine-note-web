import LoginForm from "@/components/auth/LoginForm";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkText="Sign up now"
      footerLinkHref="/auth/signup"
    >
      <LoginForm />
      <hr className="my-5 mx-auto h-0.5 w-60 border-0 bg-accent-500/50 rounded-full" />
      <GoogleLoginButton />
    </AuthLayout>
  );
}
