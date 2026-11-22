import { CardDescription, CardHeader, CardRoot } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/shared/ui/brand";

export function LoginView({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-white font-sans text-slate-950 lg:grid lg:grid-cols-2">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-6 sm:px-12 lg:px-14">
        <header className="pt-7 sm:pt-10">
          <Brand />
        </header>
        <section aria-labelledby="login-heading" className="mx-auto my-auto w-full max-w-sm py-14">
          <h1 id="login-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome back
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Sign in to manage your aircraft and operations.
          </p>
          <div className="mt-8">{children}</div>
        </section>
      </div>
      <div className="relative m-3 hidden overflow-hidden rounded-[1.75rem] bg-slate-950 lg:block">
        <Image
          src="/images/sign-in-aircraft.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
      </div>
    </main>
  );
}

export function LoginUnavailable({ canPreview }: { canPreview: boolean }) {
  return (
    <CardRoot className="gap-4 rounded-2xl border border-slate-200 p-5 shadow-none">
      <CardHeader className="gap-1.5">
        <h2 className="font-semibold text-slate-950">Sign-in unavailable</h2>
        <CardDescription className="text-slate-600">
          {canPreview
            ? "Connect a Clerk instance to enable sign-in."
            : "Sign-in is currently unavailable. Please try again later."}
        </CardDescription>
      </CardHeader>
      {canPreview && (
        <Link
          href="/dashboard"
          className="inline-flex min-h-10 items-center justify-between gap-2 self-start rounded-lg bg-blue-800 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Preview dashboard
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </CardRoot>
  );
}
