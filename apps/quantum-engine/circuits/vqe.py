from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

def run_vqe(qubits: int, shots: int, params: dict) -> dict:
    # theta è il parametro variazionale del circuito
    # in VQE reale viene ottimizzato iterativamente per minimizzare l'energia
    # default: π/4 (45 gradi) — una rotazione moderata
    theta = params.get("theta", np.pi / 4)
    
    # crea un circuito quantistico con N qubit
    qc = QuantumCircuit(qubits)
    
    # --- ANSATZ (forma del circuito parametrizzato) ---
    # RY(theta): ruota ogni qubit di "theta" gradi attorno all'asse Y del vettore di Bloch
    # theta = 0   → qubit rimane |0>
    # theta = π/2 → qubit in superposizione perfetta (come Hadamard)
    # theta = π   → qubit diventa |1>
    # theta variabile → esploriamo diversi stati quantistici
    for i in range(qubits):
        qc.ry(theta, i)
    
    # CNOT tra qubit adiacenti → crea entanglement
    # collegamento tra qubit = correlazione quantistica tra le particelle
    for i in range(qubits - 1):
        qc.cx(i, i + 1)
    
    # --- SIMULAZIONE ---
    sv = Statevector(qc)
    
    # dizionario di probabilità per ogni stato base
    probs = sv.probabilities_dict()
    
    # rimuove stati con probabilità quasi zero
    probs = {k: v for k, v in probs.items() if v > 0}
    
    # normalizza le probabilità
    total = sum(probs.values())
    probs = {k: v / total for k, v in probs.items()}
    
    # --- CALCOLO ENERGIA ---
    # energia = valor medio dell'Hamiltoniano Z (operatore di spin)
    # per ogni stato binario k:
    #   se il numero di 1 nel bitstring è pari  → contributo negativo (-1 × probabilità)
    #   se il numero di 1 nel bitstring è dispari → contributo positivo (+1 × probabilità)
    # in VQE reale l'obiettivo è trovare theta che minimizza questa energia
    # energia bassa = stato fondamentale del sistema quantistico
    energy = float(np.sum([
        (-1 if int(k, 2) % 2 == 0 else 1) * v 
        for k, v in probs.items()
    ]))
    
    return {
        # conteggi simulati delle misurazioni
        "counts": {k: max(1, int(v * shots)) for k, v in probs.items()},
        
        # probabilità pure per il grafico frontend
        "probabilities": list(probs.values()),
        
        # stato con probabilità più alta
        "optimal_state": max(probs, key=probs.get),
        
        # valore di energia calcolato — in VQE reale si minimizza questo valore
        # nel portfolio lo mostriamo come metrica nel ResultViewer
        "energy_value": energy,
    }