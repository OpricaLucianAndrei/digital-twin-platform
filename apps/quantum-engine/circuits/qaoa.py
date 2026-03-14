from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

def run_qaoa(qubits: int, shots: int, params: dict) -> dict:
    # crea un circuito quantistico con N qubit
    qc = QuantumCircuit(qubits)
    
    # --- INIZIALIZZAZIONE ---
    # applica Hadamard a tutti i qubit
    # ogni qubit entra in superposizione: probabilità uguale per 0 e 1
    # questo rappresenta "tutte le soluzioni possibili contemporaneamente"
    for i in range(qubits):
        qc.h(i)
    
    # --- LAYER DI ENTANGLEMENT ---
    # applica CNOT tra qubit adiacenti (i → i+1)
    # CNOT = "se il qubit i è |1>, inverti il qubit i+1"
    # questo crea correlazioni (entanglement) tra i qubit
    # in QAOA reale questo layer codifica i "vincoli del problema" da ottimizzare
    for i in range(qubits - 1):
        qc.cx(i, i + 1)
    
    # --- SIMULAZIONE ---
    # simula il circuito con Statevector (simulatore esatto, no rumore)
    sv = Statevector(qc)
    
    # converte lo stato quantistico in dizionario di probabilità
    # es. per 2 qubit: {"00": 0.5, "11": 0.5} → stato di Bell
    probs = sv.probabilities_dict()
    
    # rimuove stati con probabilità zero (artefatti numerici della simulazione)
    probs = {k: v for k, v in probs.items() if v > 0}
    
    # normalizza: assicura che tutte le probabilità sommino esattamente a 1.0
    total = sum(probs.values())
    probs = {k: v / total for k, v in probs.items()}
    
    return {
        # conta le misurazioni simulate: ogni stato viene "misurato" shots volte in proporzione
        # max(1, ...) garantisce almeno 1 conteggio per stati con prob molto bassa
        "counts": {k: max(1, int(v * shots)) for k, v in probs.items()},
        
        # probabilità pure per ogni stato (usate dal frontend per il grafico)
        "probabilities": list(probs.values()),
        
        # stato con la probabilità più alta = "soluzione ottimale trovata"
        # in QAOA reale questo è il risultato dell'ottimizzazione
        "optimal_state": max(probs, key=probs.get),
    }