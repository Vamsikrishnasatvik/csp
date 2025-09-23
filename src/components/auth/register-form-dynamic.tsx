"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const RegistrationForm = dynamic(() => import('@/components/auth/registration-form').then(mod => mod.RegistrationForm), { 
    ssr: false,
    loading: () => <Skeleton className="h-[450px] w-full" />,
});

export function RegisterFormDynamic() {
    return <RegistrationForm />;
}
