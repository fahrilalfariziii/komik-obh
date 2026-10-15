export default function AnimePlayer({ streamUrl, title }: { streamUrl: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-black">
      <iframe
        key={streamUrl}
        src={streamUrl}
        title={`Nonton ${title}`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="aspect-video w-full"
      />
    </div>
  );
}
