from typing import Any
from circuits.builder import build_circuit

results: dict[str, Any] = {}

class JobRunner:
    def get_result(self, job_id: str):
        return results.get(job_id)

    def run(self, req):
        try:
            result = build_circuit(
                algorithm=req.algorithm,
                qubits=req.qubits,
                shots=req.shots,
                params=req.params,
            )
            results[req.job_id] = {
                "status": "completed",
                "job_id": req.job_id,
                **result
            }
        except Exception as e:
            results[req.job_id] = {
                "status": "failed",
                "job_id": req.job_id,
                "error": str(e)
            }