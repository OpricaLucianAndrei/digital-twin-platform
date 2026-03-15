import { z } from 'zod';

// ── Status ────────────────────────────────────────────────────────────────
export const DeviceStatusSchema = z.enum([
  'online',
  'warning',
  'alarm',
  'offline',
  'maintenance',
]);

export type DeviceStatus = z.infer<typeof DeviceStatusSchema>;

// ── Type ──────────────────────────────────────────────────────────────────
export const DeviceTypeSchema = z.enum([
  'robot_arm',
  'conveyor',
  'sensor',
  'pump',
  'motor',
  'hvac',
  'power_unit',
]);

export type DeviceType = z.infer<typeof DeviceTypeSchema>;

// ── Device ────────────────────────────────────────────────────────────────
export const DeviceSchema = z.object({
  id:          z.string().regex(/^[a-z]+_[a-z]+_\d{2}$/),
  name:        z.string().min(1).max(100),
  type:        DeviceTypeSchema,
  status:      DeviceStatusSchema,
  zoneId:      z.string(),
  facilityId:  z.string(),
  temperature: z.number().min(-50).max(200),   // °C
  vibration:   z.number().min(0).max(20),      // mm/s
  power:       z.number().min(0).max(1000),    // kW
  lastSeen:    z.number().int(),               // Unix timestamp ms
  svgElementId:z.string().nullable(),          // ID elemento SVG nella mappa
});

export type Device = z.infer<typeof DeviceSchema>;

// ── deriveStatus ──────────────────────────────────────────────────────────
// Unica fonte di verità per lo status — calcolato dai valori di telemetria
export function deriveStatus(
  temperature: number,
  vibration: number,
  power: number,
  currentStatus: DeviceStatus = 'online'
): DeviceStatus {
  if (currentStatus === 'offline' || currentStatus === 'maintenance') {
    return currentStatus;
  }
  if (temperature > 90 || vibration > 8.0 || power > 900) {
    return 'alarm';
  }
  if (temperature > 75 || vibration > 5.0 || power > 750) {
    return 'warning';
  }
  return 'online';
}

// ── Thresholds ────────────────────────────────────────────────────────────
export const DEVICE_THRESHOLDS = {
  temperature: { warning: 75, alarm: 90 },
  vibration:   { warning: 5.0, alarm: 8.0 },
  power:       { warning: 750, alarm: 900 },
} as const;