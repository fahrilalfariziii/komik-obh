"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Icon from "@/components/Icon";
import { deleteHistoryRow, type Domain } from "@/lib/history";

export default function HistoryDeleteButton({
  domain,
  refId,
  title,
}: {
  domain: Domain;
  refId: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function onDelete() {
    try {
      await deleteHistoryRow({ domain, ref: refId });
    } finally {
      startTransition(() => router.refresh());
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      aria-label={`Hapus riwayat ${title}`}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-raised)] hover:text-[var(--text)] disabled:opacity-50"
    >
      <Icon name="close" size={15} />
    </button>
  );
}
