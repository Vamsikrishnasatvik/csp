import { Bus, Shield } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
          <Bus className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-center">SmartCommute</h1>
        <p className="text-muted-foreground text-center">Commute Planner</p>
      </div>
      <div className="w-full max-w-md space-y-8">
        <LoginForm userType="student" />
        <LoginForm userType="admin" />
      </div>
    </main>
  );
}
