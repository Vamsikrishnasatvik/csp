"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Password updated successfully. You can now login.");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(data.error || "Failed to reset password.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <Button type="submit" className="w-full">Reset Password</Button>
        <FormMessage>{message}</FormMessage>
      </form>
      <Link href="/reset-password" className="underline underline-offset-4 hover:text-primary">
        Forgot Password?
      </Link>
    </div>
  );
}