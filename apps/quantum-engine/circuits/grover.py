from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

def run_grover(qubits: int, shots: int, params: dict) -> dict:
    target = params.get("target", "1" * qubits)
    qc = QuantumCircuit(qubits)
    
    # --- INIZIALIZZAZIONE ---
    # superposizione uniforme su tutti gli stati
    for i in range(qubits):
        qc.h(i)
    
    # --- ORACOLO ---
    # segna lo stato target con fase negativa
    # flip i qubit che nel target sono 0 (così l'oracolo agisce su tutti-1)
    for i, bit in enumerate(reversed(target)):
        if bit == "0":
            qc.x(i)
    # phase kickback: applica fase -1 allo stato target
    qc.h(qubits - 1)
    qc.mcx(list(range(qubits - 1)), qubits - 1)
    qc.h(qubits - 1)
    # ripristina i flip
    for i, bit in enumerate(reversed(target)):
        if bit == "0":
            qc.x(i)
    
    # --- DIFFUSIONE (inversion about the mean) ---
    # amplifica la probabilità dello stato marcato
    for i in range(qubits):
        qc.h(i)
    for i in range(qubits):
        qc.x(i)
    qc.h(qubits - 1)
    qc.mcx(list(range(qubits - 1)), qubits - 1)
    qc.h(qubits - 1)
    for i in range(qubits):
        qc.x(i)
    for i in range(qubits):
        qc.h(i)
    
    # --- SIMULAZIONE ---
    sv = Statevector(qc)
    probs = sv.probabilities_dict()
    probs = {k: v for k, v in probs.items() if v > 0}
    total = sum(probs.values())
    probs = {k: v / total for k, v in probs.items()}
    
    return {
        "counts": {k: max(1, int(v * shots)) for k, v in probs.items()},
        "probabilities": list(probs.values()),
        "optimal_state": max(probs, key=probs.get),
        "target": target,
    }