"use client";

import { useState } from "react";
import RankRow from "@/components/RankRow";
import Icon, { type IconName } from "@/components/Icon";
import { slugFromLink, type SankaHomeItem } from "@/lib/sanka";

const TABS = [
  { key: "harian", label: "Harian", icon: "trending", limit: 10 },
  { key: "mingguan", label: "Mingguan", icon: "trophy", limit: 10 },
] as const satisfies ReadonlyArray<{
  key: string;
  label: string;
  icon: IconName;
  limit: number;
}>;

export default function TabLeaderboard({
  popular,
  latest,
}: {
  popular: SankaHomeItem[];
  latest: SankaHomeItem[];
}) {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("harian");
  const source: Record<string, SankaHomeItem[]> = { harian: popular, mingguan: latest };
  const limit = TABS.find((t) => t.key === active)?.limit ?? 10;
  const items = (source[active] ?? []).slice(0, limit);

  return (
    <section aria-labelledby="peringkat" className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-4">
        <h2 id="peringkat" className="inline-flex items-center gap-2 text-lg font-semibold">
          <Icon name="trophy" size={18} className="text-[var(--accent)]" />
          Peringkat Komik
        </h2>
        <div role="tablist" aria-label="Periode peringkat" className="flex gap-1 rounded-full border border-[var(--border)] p-0.5">
          {TABS.map((tab) => {
            const on = active === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setActive(tab.key)}
                className={`flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors ${
                  on
                    ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Icon name={tab.icon} size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <ol className="divide-y divide-[var(--border)] p-1">
        {items.map((c, i) => (
          <li key={c.link}>
            <RankRow
              rank={i + 1}
              href={`/manga/${slugFromLink(c.link)}`}
              title={c.title}
              cover={c.image}
              meta={c.chapter}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
