import AuthLeft from "@/components/auth/auth-left";
import AuthForm from "@/components/auth/auth-form";
import ToastProvider from "@/components/ui/toast-provider";

export const metadata = {
  title: "Sign in — Grafidu",
};

export default function LoginPage() {
  return (
    <ToastProvider>
      <div className="auth">
        <AuthLeft />
        <main className="auth-right">
          <AuthForm mode="login" />
        </main>
      </div>
    </ToastProvider>
  );
}