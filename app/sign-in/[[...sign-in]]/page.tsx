import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Icon from "@/components/Icon";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-card)] bg-[var(--accent)] text-[var(--accent-ink)]">
        <Icon name="book" size={24} />
      </span>
      <h1 className="mt-4 text-xl font-bold tracking-tight">
        Komik<span className="text-[var(--accent)]">Reader</span>
      </h1>
      <p className="mb-6 mt-1 text-center text-sm text-[var(--text-muted)]">
        Masuk dengan akun pemilik untuk lanjut membaca.
      </p>
      <SignIn appearance={{ ...dark, variables: { colorPrimary: "#fbbf24" } }} />
    </main>
  );
}
