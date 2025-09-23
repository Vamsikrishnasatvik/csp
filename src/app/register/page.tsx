import { Bus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const RegistrationForm = dynamic(() => import('@/components/auth/registration-form').then(mod => mod.RegistrationForm), { 
    ssr: false,
    loading: () => <Skeleton className="h-[450px] w-full" />,
});

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
            <Bus className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="text-muted-foreground text-center">Join the SmartCommute platform.</p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  );
}
