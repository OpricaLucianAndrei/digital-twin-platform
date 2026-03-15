/**
 * Formatta un timestamp Unix (ms) in stringa leggibile
 */
export function formatTimestamp(timestamp: number, timezone = 'Europe/Rome'): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: timezone,
    year:     'numeric',
    month:    '2-digit',
    day:      '2-digit',
    hour:     '2-digit',
    minute:   '2-digit',
    second:   '2-digit',
  }).format(new Date(timestamp));
}

/**
 * Formatta una durata in ms in stringa leggibile
 * Es: 3661000 → "1h 1m 1s"
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);

  const h = hours;
  const m = minutes % 60;
  const s = seconds % 60;

  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/**
 * Restituisce quanto tempo fa rispetto ad ora
 * Es: "2 minuti fa", "1 ora fa"
 */
export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

  if (days > 0)    return `${days} giorno${days > 1 ? 'i' : ''} fa`;
  if (hours > 0)   return `${hours} ora${hours > 1 ? 'e' : ''} fa`;
  if (minutes > 0) return `${minutes} minut${minutes > 1 ? 'i' : 'o'} fa`;
  return 'adesso';
}

/**
 * Verifica se un timestamp è considerato "stale" (troppo vecchio)
 * Default: stale dopo 30 secondi
 */
export function isStale(timestamp: number, thresholdMs = 30_000): boolean {
  return Date.now() - timestamp > thresholdMs;
}