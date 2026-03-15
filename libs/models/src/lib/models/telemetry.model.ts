import { z } from 'zod';

// ── Telemetry ─────────────────────────────────────────────────────────────
export const TelemetrySchema = z.object({
  deviceId:    z.string(),
  temperature: z.number().min(-50).max(200),
  vibration:   z.number().min(0).max(20),
  power:       z.number().min(0).max(1000),
  timestamp:   z.number().int(),
  source:      z.enum(['mqtt', 'simulation', 'replay']),
});

export type Telemetry = z.infer<typeof TelemetrySchema>;

// ── Telemetry Batch ───────────────────────────────────────────────────────
// Usato per WebSocket batch broadcasting (finestra 50ms)
export const TelemetryBatchSchema = z.object({
  items:     z.array(TelemetrySchema),
  batchedAt: z.number().int(),
});

export type TelemetryBatch = z.infer<typeof TelemetryBatchSchema>;

// ── Telemetry History ─────────────────────────────────────────────────────
// Usato per il timeline replay
export const TelemetryHistorySchema = z.object({
  deviceId: z.string(),
  from:     z.number().int(),
  to:       z.number().int(),
  items:    z.array(TelemetrySchema),
});

export type TelemetryHistory = z.infer<typeof TelemetryHistorySchema>;