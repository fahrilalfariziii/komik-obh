export function nextChapterSameLang(list: { id: string }[], currentId: string) {
  const i = list.findIndex((c) => c.id === currentId);
  return list[i + 1]?.id ?? null;
}

export function prevChapterSameLang(list: { id: string }[], currentId: string) {
  const i = list.findIndex((c) => c.id === currentId);
  return list[i - 1]?.id ?? null;
}
