from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.runner import JobRunner

app = FastAPI(title="Quantum Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

runner = JobRunner()

class ExecuteRequest(BaseModel):
    job_id: str
    algorithm: str  # "vqe" | "qaoa" | "grover" | "custom"
    qubits: int
    shots: int = 1024
    params: dict = {}
    backend: str = "statevector_simulator"

@app.post("/execute")
async def execute_circuit(req: ExecuteRequest, tasks: BackgroundTasks):
    tasks.add_task(runner.run, req)
    return {"status": "queued", "job_id": req.job_id}

@app.get("/health")
async def health():
    return {"status": "ok", "qiskit": "available"}

@app.get("/results/{job_id}")
async def get_result(job_id: str):
    result = runner.get_result(job_id)
    if not result:
        return {"status": "pending"}
    return result