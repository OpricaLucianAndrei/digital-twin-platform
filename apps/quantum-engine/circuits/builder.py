from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from circuits.qaoa import run_qaoa
from circuits.vqe import run_vqe
from circuits.grover import run_grover

def build_circuit(algorithm: str, qubits: int, shots: int, params: dict) -> dict:
    if algorithm == "qaoa":
        return run_qaoa(qubits, shots, params)
    elif algorithm == "vqe":
        return run_vqe(qubits, shots, params)
    elif algorithm == "grover":
        return run_grover(qubits, shots, params)
    else:
        return run_default(qubits, shots)

def run_default(qubits: int, shots: int) -> dict:
    qc = QuantumCircuit(qubits)
    for i in range(qubits):
        qc.h(i)
    qc.measure_all()
    sv = Statevector(qc.remove_final_measurements(inplace=False))
    probs = sv.probabilities_dict()
    return {
        "counts": {k: int(v * shots) for k, v in probs.items()},
        "probabilities": list(probs.values()),
        "optimal_state": max(probs, key=probs.get),
    }