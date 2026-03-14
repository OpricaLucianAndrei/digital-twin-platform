import { z } from 'zod';

export const CircuitResultSchema = z.object({
  jobId:          z.string().uuid(),
  counts:         z.record(z.string(), z.number()),
  probabilities:  z.array(z.number()),
  statevector:    z.array(z.number()).nullable(),
  fidelity:       z.number().min(0).max(1).nullable(),
  errorRate:      z.number().min(0).max(1).nullable(),
  energyValue:    z.number().nullable(),
  optimalParams:  z.record(z.string(), z.number()).nullable(),
  rawBackendData: z.unknown().nullable(),
});

export type CircuitResult = z.infer<typeof CircuitResultSchema>;