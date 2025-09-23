import { UserLayout } from "@/components/layouts/user-layout";
import { CityGuideSuggestions } from "@/components/user/city-guide-suggestions";

export default function CityGuidePage() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">City Guide</h1>
          <p className="text-muted-foreground">
            Discover popular destinations, get route suggestions, and travel safely.
          </p>
        </div>
        <CityGuideSuggestions />
      </div>
    </UserLayout>
  );
}
