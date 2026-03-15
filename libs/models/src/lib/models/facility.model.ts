import { z } from 'zod';

// ── Zone ──────────────────────────────────────────────────────────────────
export const ZoneSchema = z.object({
  id:          z.string(),
  name:        z.string().min(1).max(100),
  facilityId:  z.string(),
  svgGroupId:  z.string().nullable(), // ID gruppo SVG nella mappa
  deviceIds:   z.array(z.string()),
});

export type Zone = z.infer<typeof ZoneSchema>;

// ── Facility ──────────────────────────────────────────────────────────────
export const FacilitySchema = z.object({
  id:       z.string(),
  name:     z.string().min(1).max(100),
  location: z.string(),
  timezone: z.string(),
  svgUrl:   z.string().url().nullable(), // URL del file SVG della planimetria
  zones:    z.array(ZoneSchema),
});

export type Facility = z.infer<typeof FacilitySchema>;

// ── Facility Summary ──────────────────────────────────────────────────────
// Versione leggera per liste e dropdown
export const FacilitySummarySchema = z.object({
  id:       z.string(),
  name:     z.string(),
  location: z.string(),
  timezone: z.string(),
  zoneCount:   z.number().int(),
  deviceCount: z.number().int(),
});

export type FacilitySummary = z.infer<typeof FacilitySummarySchema>;