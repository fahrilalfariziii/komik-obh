import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export function isAllowed(email: string, owner: string): boolean {
  if (!email || !owner) return false;
  return email.toLowerCase() === owner.toLowerCase();
}

export async function requireOwner(): Promise<void> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "";
  const owner = process.env.OWNER_EMAIL ?? "";
  if (!isAllowed(email, owner)) redirect("/ditolak");
}
