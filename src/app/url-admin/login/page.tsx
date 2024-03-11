"use client";
import { LoginForm } from "@/components/Forms";

export default function LoginPage() {
  return (
    <main className="absolute inset-0">
      <div className="flex items-center justify-center h-full">
        <LoginForm />
      </div>
    </main>
  );
}
