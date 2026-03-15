import { z } from 'zod';

// ── Alarm Level ───────────────────────────────────────────────────────────
export const AlarmLevelSchema = z.enum(['warning', 'alarm', 'critical']);
export type AlarmLevel = z.infer<typeof AlarmLevelSchema>;

// ── Alarm Metric ──────────────────────────────────────────────────────────
export const AlarmMetricSchema = z.enum(['temperature', 'vibration', 'power']);
export type AlarmMetric = z.infer<typeof AlarmMetricSchema>;

// ── Alarm ─────────────────────────────────────────────────────────────────
export const AlarmSchema = z.object({
  id:           z.string().uuid(),
  deviceId:     z.string(),
  facilityId:   z.string(),
  level:        AlarmLevelSchema,
  metric:       AlarmMetricSchema,
  value:        z.number(),
  threshold:    z.number(),
  message:      z.string(),
  timestamp:    z.number().int(),
  resolvedAt:   z.number().int().nullable(),
  acknowledged: z.boolean().default(false),
  acknowledgedBy: z.string().nullable(),
  acknowledgedAt: z.number().int().nullable(),
});

export type Alarm = z.infer<typeof AlarmSchema>;

// ── Alarm Event ───────────────────────────────────────────────────────────
// Usato per WebSocket real-time notifications
export const AlarmEventSchema = z.discriminatedUnion('type', [
  z.object({
    type:  z.literal('alarm:created'),
    alarm: AlarmSchema,
  }),
  z.object({
    type:    z.literal('alarm:resolved'),
    alarmId: z.string().uuid(),
    resolvedAt: z.number().int(),
  }),
  z.object({
    type:    z.literal('alarm:acknowledged'),
    alarmId: z.string().uuid(),
    by:      z.string(),
  }),
]);

export type AlarmEvent = z.infer<typeof AlarmEventSchema>;

// ── Alarm Buffer ──────────────────────────────────────────────────────────
export const MAX_ALARMS_IN_MEMORY = 500;