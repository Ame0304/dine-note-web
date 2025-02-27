import GoogleLoginButton from "@/components/GoogleLoginButton";
import SignUpForm from "@/components/SignupForm";
import AuthLayout from "@/components/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create a new account"
      footerText="Already have an account?"
      footerLinkText="Log in here"
      footerLinkHref="/auth/login"
    >
      <SignUpForm />
      <hr className="my-5 mx-auto h-0.5 w-60 border-0 bg-accent-500/50 rounded-full" />
      <GoogleLoginButton />
    </AuthLayout>
  );
}
