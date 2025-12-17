"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateUserPreferences } from "@/lib/actions/settings";
import type { UserPreferences } from "@/lib/types/database";

interface UpdateProfileFormProps {
  user: {
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  } | null;
  preferences: UserPreferences | null;
}

export function UpdateProfileForm({ user, preferences }: UpdateProfileFormProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(preferences?.display_name || user?.user_metadata?.full_name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const result = await updateUserPreferences({
      display_name: displayName || null,
    });

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      router.refresh(); // Refresh to show updated name in sidebar
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and display name
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* Display Name */}
            <div className="grid gap-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                type="text"
                placeholder="Enter your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This name will be displayed in the sidebar and throughout the app
              </p>
            </div>

            {/* Email (Read-only) */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Email cannot be changed from here. Contact support to change your email.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-sm text-green-500">Profile updated successfully!</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="min-w-[140px]" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
