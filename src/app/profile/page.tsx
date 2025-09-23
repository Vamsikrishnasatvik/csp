import { UserLayout } from "@/components/layouts/user-layout";
import { ProfileForm } from "@/components/user/profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockUser } from "@/lib/data";

export default function ProfilePage() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">Manage your personal and vehicle information.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Update your information here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent>
                <ProfileForm user={mockUser} />
            </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
