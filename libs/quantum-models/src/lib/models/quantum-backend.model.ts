import { z } from 'zod';

export const QuantumBackendSchema = z.object({
  id:               z.string(),
  provider:         z.enum(['ibm', 'azure', 'ionq', 'local_simulator', 'aws_braket']),
  name:             z.string(),
  qubitCount:       z.number().int(),
  queueLength:      z.number().int(),
  status:           z.enum(['online', 'degraded', 'offline', 'maintenance']),
  calibrationScore: z.number().min(0).max(1),
  gateErrorRate:    z.number().min(0).max(1).nullable(),
  t1:               z.number().nullable(),
  t2:               z.number().nullable(),
  lastCalibrated:   z.number().int(),
  maxShots:         z.number().int().default(8192),
  supportedGates:   z.array(z.string()),
});

export type QuantumBackend         = z.infer<typeof QuantumBackendSchema>;
export type QuantumBackendProvider = z.infer<typeof QuantumBackendSchema>['provider'];
export type QuantumBackendStatus   = z.infer<typeof QuantumBackendSchema>['status'];