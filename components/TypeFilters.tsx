"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";

const base =
  "inline-flex min-h-[36px] items-center rounded-full border px-3 text-xs font-medium transition-colors";

export default function TypeFilters({
  active = "all",
  options,
}: {
  active?: string;
  options: Array<{ value: string; label: string }>;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const select = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all") next.set("type", value);
    else next.delete("type");
    router.push(`/search?${next.toString()}`);
  };

  return (
    <div role="group" aria-label="Filter jenis komik" className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = active === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => select(o.value)}
            className={`${base} ${
              on
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                : "border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
            }`}
          >
            {o.value === active ? <Icon name="check" size={13} className="mr-1" /> : null}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
