
"use client";

import { useState } from 'react';
import { Bus } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [userType, setUserType] = useState<'student' | 'admin'>('student');

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
            <Bus className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-center">SmartCommute</h1>
          <p className="text-muted-foreground text-center">Commute Planner</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Tabs 
              defaultValue="student" 
              className="w-full" 
              onValueChange={(value) => setUserType(value as 'student' | 'admin')}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student">Student Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>
              <LoginForm userType={userType} />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
