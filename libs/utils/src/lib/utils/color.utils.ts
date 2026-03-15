import { DeviceStatus } from '@digital-twin-platform-project/models';

/**
 * Mappa lo status del device al colore CSS corrispondente
 * Usa CSS custom properties del design system
 */
export function statusToColor(status: DeviceStatus): string {
  const map: Record<DeviceStatus, string> = {
    online:      'var(--color-status-online)',
    warning:     'var(--color-status-warning)',
    alarm:       'var(--color-status-alarm)',
    offline:     'var(--color-status-offline)',
    maintenance: 'var(--color-status-maintenance)',
  };
  return map[status] ?? 'var(--color-status-offline)';
}

/**
 * Converte temperatura in colore per la heatmap
 * Scala: blu (freddo) → verde (normale) → rosso (caldo)
 */
export function tempToColor(
  temperature: number,
  minTemp = 0,
  maxTemp = 100
): string {
  const t = Math.min(Math.max((temperature - minTemp) / (maxTemp - minTemp), 0), 1);

  let r: number, g: number, b: number;

  if (t < 0.5) {
    // Blu → Verde
    r = 0;
    g = Math.round(t * 2 * 255);
    b = Math.round((1 - t * 2) * 255);
  } else {
    // Verde → Rosso
    r = Math.round((t - 0.5) * 2 * 255);
    g = Math.round((1 - (t - 0.5) * 2) * 255);
    b = 0;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converte un colore hex in rgba con opacità
 */
export function hexToRgba(hex: string, alpha = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}