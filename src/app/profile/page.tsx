import { redirect } from 'next/navigation';
import { UserLayout } from "@/components/layouts/user-layout";
import { ProfileForm } from "@/components/user/profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal and vehicle information.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              Update your information here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={{
              _id: user._id.toString(),
              name: user.name,
              email: user.email,
              year: user.year || '',
              department: user.department || '',
              carpoolPreference: user.carpoolPreference || false,
              vehicleDetails: user.vehicleDetails || { model: '', plateNumber: '' }
            }} />
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
