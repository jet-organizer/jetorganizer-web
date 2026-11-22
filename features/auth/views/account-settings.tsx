import { UserButton } from "@clerk/nextjs";
import { CardDescription, CardFooter, CardHeader, CardRoot } from "@heroui/react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { hasClerkCredentials } from "@/features/auth/models/clerk-config";

export function AccountSettings() {
  const hasAccount = hasClerkCredentials();

  return (
    <CardRoot className="mt-6 max-w-md border border-neutral-200 bg-white p-5 shadow-none">
      <CardHeader>
        <h2 className="font-semibold text-neutral-900">Account</h2>
        <CardDescription>
          {hasAccount ? "Manage your profile or sign out." : "Sign-in is unavailable in this preview."}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {hasAccount ? (
          <UserButton />
        ) : (
          <Link
            href="/auth"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-sm font-medium text-blue-800 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <LogIn aria-hidden="true" className="size-4" />
            Back to sign in
          </Link>
        )}
      </CardFooter>
    </CardRoot>
  );
}
