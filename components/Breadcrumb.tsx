import Link from "next/link";

export default function Breadcrumb({
  trail,
}: {
  trail: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((t, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {t.href ? (
              <Link href={t.href} className="hover:text-zinc-100 hover:underline">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-zinc-200">
                {t.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
