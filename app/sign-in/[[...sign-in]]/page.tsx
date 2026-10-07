import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4">
      <h1 className="mb-1 text-xl font-bold tracking-tight">
        Komik<span className="text-amber-400">Reader</span>
      </h1>
      <p className="mb-6 text-sm text-zinc-400">
        Masuk dengan email untuk lanjut membaca.
      </p>
      <SignIn
        appearance={{ ...dark, variables: { colorPrimary: "#fbbf24" } }}
      />
    </main>
  );
}
