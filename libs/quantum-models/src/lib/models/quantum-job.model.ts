import { z } from 'zod';

export const QuantumJobSchema = z.object({
  id:                 z.string().uuid(),
  name:               z.string().min(1).max(100),
  algorithm:          z.enum(['vqe', 'qaoa', 'grover', 'bernstein-vazirani', 'custom']),
  backend:            z.string(),
  status:             z.enum(['queued', 'running', 'completed', 'failed', 'cancelled']),
  qubits:             z.number().int().min(1).max(127),
  shots:              z.number().int().default(1024),
  depth:              z.number().int().nullable(),
  queueTime:          z.number().nullable(),
  executionTime:      z.number().nullable(),
  submittedAt:        z.number().int(),
  completedAt:        z.number().int().nullable(),
  triggeredByDevice:  z.string().nullable(),
  triggerReason:      z.enum(['manual', 'alarm', 'warning', 'scheduled']).default('manual'),
  optimizationTarget: z.string().nullable(),
});

export type QuantumJob       = z.infer<typeof QuantumJobSchema>;
export type QuantumAlgorithm = z.infer<typeof QuantumJobSchema>['algorithm'];
export type QuantumJobStatus = z.infer<typeof QuantumJobSchema>['status'];
export type TriggerReason    = z.infer<typeof QuantumJobSchema>['triggerReason'];