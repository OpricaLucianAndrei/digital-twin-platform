import { Telemetry } from '@digital-twin-platform-project/models';
import { gaussian, clamp } from './math.utils';

/**
 * Genera un valore di telemetria simulato con rumore gaussiano
 * Usato dal simulatore per generare dati realistici
 */
export function simulateTelemetry(
  deviceId: string,
  baseTemperature = 65,
  baseVibration = 2.5,
  basePower = 450
): Telemetry {
  return {
    deviceId,
    temperature: clamp(gaussian(baseTemperature, 2.5), -50, 200),
    vibration:   clamp(gaussian(baseVibration, 0.3), 0, 20),
    power:       clamp(gaussian(basePower, 25), 0, 1000),
    timestamp:   Date.now(),
    source:      'simulation',
  };
}

/**
 * Calcola la media mobile di un array di valori
 * Usato per smoothing dei grafici storici
 */
export function movingAverage(values: number[], windowSize = 5): number[] {
  if (values.length === 0) return [];
  return values.map((_, i) => {
    const start = Math.max(0, i - windowSize + 1);
    const window = values.slice(start, i + 1);
    return window.reduce((sum, v) => sum + v, 0) / window.length;
  });
}

/**
 * Calcola il trend di una serie temporale
 * Restituisce: 'rising' | 'falling' | 'stable'
 */
export function calculateTrend(
  values: number[],
  threshold = 0.05
): 'rising' | 'falling' | 'stable' {
  if (values.length < 2) return 'stable';
  const first = values[0] ?? 0;
  const last = values[values.length - 1] ?? 0;
  const change = (last - first) / (first || 1);
  if (change > threshold) return 'rising';
  if (change < -threshold) return 'falling';
  return 'stable';
}