import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Spinner } from "@heroui/react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { hasClerkCredentials } from "@/features/auth/models/clerk-config";
import { LoginUnavailable, LoginView } from "@/features/auth/views/login-view";

export const metadata: Metadata = { title: "Sign in | JetOrganizer" };

function SignInLoading() {
  return (
    <div className="flex min-h-32 items-center justify-center" role="status">
      <Spinner size="sm" aria-hidden="true" />
      <span className="sr-only">Loading sign in</span>
    </div>
  );
}

async function ClerkSignIn() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <SignIn
      path="/auth"
      routing="path"
      forceRedirectUrl="/dashboard"
      withSignUp={false}
      transferable={false}
      fallback={<SignInLoading />}
      appearance={{
        variables: { colorPrimary: "#173d82", borderRadius: "0.75rem" },
        elements: { rootBox: "w-full", cardBox: "w-full" },
      }}
    />
  );
}

export default function LoginPage() {
  return (
    <LoginView>
      {hasClerkCredentials() ? (
        <Suspense fallback={<SignInLoading />}>
          <ClerkSignIn />
        </Suspense>
      ) : (
        <LoginUnavailable canPreview={process.env.NODE_ENV === "development"} />
      )}
    </LoginView>
  );
}
