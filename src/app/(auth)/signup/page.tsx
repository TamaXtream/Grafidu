import AuthLeft from "@/components/auth/auth-left";
import AuthForm from "@/components/auth/auth-form";
import ToastProvider from "@/components/ui/toast-provider";

export const metadata = {
  title: "Sign up — Grafidu",
};

export default function SignupPage() {
  return (
    <ToastProvider>
      <div className="auth">
        <AuthLeft />
        <main className="auth-right">
          <AuthForm mode="signup" />
        </main>
      </div>
    </ToastProvider>
  );
}