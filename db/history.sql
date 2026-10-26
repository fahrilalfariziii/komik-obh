-- Riwayat baca/tonton KomikReader (fitur history).
-- Jalankan SEKALI via Neon console (SQL Editor) sebelum deploy.
CREATE TABLE IF NOT EXISTS history (
  user_id    TEXT        NOT NULL,
  domain     TEXT        NOT NULL CHECK (domain IN ('komik', 'anime', 'drakor', 'movie')),
  ref        TEXT        NOT NULL,
  title      TEXT        NOT NULL,
  poster_url TEXT,
  payload    JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, domain, ref)
);

-- Daftar baris terbaru per user di halaman /history.
CREATE INDEX IF NOT EXISTS history_user_recent
  ON history (user_id, updated_at DESC);
