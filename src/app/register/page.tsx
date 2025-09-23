import { Bus } from 'lucide-react';
import { RegistrationForm } from '@/components/auth/registration-form';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
            <Bus className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="text-muted-foreground text-center">Join the SmartCommute platform at Woxsen University.</p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  );
}
