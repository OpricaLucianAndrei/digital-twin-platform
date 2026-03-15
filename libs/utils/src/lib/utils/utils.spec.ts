import { gaussian, clamp, lerp, normalize, round } from './math.utils';
import { tempToColor, hexToRgba } from './color.utils';
import { movingAverage, calculateTrend } from './telemetry.utils';
import { formatDuration, timeAgo, isStale } from './time.utils';

describe('math.utils', () => {
  describe('clamp', () => {
    it('limita al minimo', () => expect(clamp(-5, 0, 100)).toBe(0));
    it('limita al massimo', () => expect(clamp(150, 0, 100)).toBe(100));
    it('lascia invariato il valore nel range', () => expect(clamp(50, 0, 100)).toBe(50));
  });

  describe('lerp', () => {
    it('restituisce a quando t=0', () => expect(lerp(0, 100, 0)).toBe(0));
    it('restituisce b quando t=1', () => expect(lerp(0, 100, 1)).toBe(100));
    it('restituisce il punto medio quando t=0.5', () => expect(lerp(0, 100, 0.5)).toBe(50));
  });

  describe('normalize', () => {
    it('normalizza correttamente', () => expect(normalize(50, 0, 100)).toBe(0.5));
    it('gestisce min === max', () => expect(normalize(50, 50, 50)).toBe(0));
  });

  describe('round', () => {
    it('arrotonda a 2 decimali di default', () => expect(round(3.14159)).toBe(3.14));
    it('arrotonda a N decimali', () => expect(round(3.14159, 4)).toBe(3.1416));
  });

  describe('gaussian', () => {
    it('genera valori vicini alla media', () => {
      const values = Array.from({ length: 1000 }, () => gaussian(65, 2.5));
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      expect(avg).toBeGreaterThan(63);
      expect(avg).toBeLessThan(67);
    });
  });
});

describe('color.utils', () => {
  describe('tempToColor', () => {
    it('restituisce blu per temperatura bassa', () => {
      expect(tempToColor(0, 0, 100)).toBe('rgb(0, 0, 255)');
    });
    it('restituisce rosso per temperatura alta', () => {
      expect(tempToColor(100, 0, 100)).toBe('rgb(255, 0, 0)');
    });
  });

  describe('hexToRgba', () => {
    it('converte hex in rgba', () => {
      expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });
  });
});

describe('telemetry.utils', () => {
  describe('movingAverage', () => {
    it('calcola la media mobile', () => {
      const result = movingAverage([1, 2, 3, 4, 5], 3);
      expect(result[2]).toBe(2);
      expect(result[4]).toBe(4);
    });
    it('gestisce array vuoto', () => {
      expect(movingAverage([])).toEqual([]);
    });
  });

  describe('calculateTrend', () => {
    it('rileva trend crescente', () => {
      expect(calculateTrend([1, 2, 3, 4, 5])).toBe('rising');
    });
    it('rileva trend decrescente', () => {
      expect(calculateTrend([5, 4, 3, 2, 1])).toBe('falling');
    });
    it('rileva trend stabile', () => {
      expect(calculateTrend([10, 10, 10, 10])).toBe('stable');
    });
    it('gestisce array con meno di 2 elementi', () => {
      expect(calculateTrend([5])).toBe('stable');
    });
  });
});

describe('time.utils', () => {
  describe('formatDuration', () => {
    it('formatta secondi', () => expect(formatDuration(5000)).toBe('5s'));
    it('formatta minuti e secondi', () => expect(formatDuration(65000)).toBe('1m 5s'));
    it('formatta ore minuti e secondi', () => expect(formatDuration(3661000)).toBe('1h 1m 1s'));
  });

  describe('isStale', () => {
    it('restituisce true per timestamp vecchio', () => {
      expect(isStale(Date.now() - 60_000)).toBe(true);
    });
    it('restituisce false per timestamp recente', () => {
      expect(isStale(Date.now())).toBe(false);
    });
  });

  describe('timeAgo', () => {
    it('restituisce adesso per timestamp recente', () => {
      expect(timeAgo(Date.now())).toBe('adesso');
    });
    it('restituisce minuti fa', () => {
      expect(timeAgo(Date.now() - 120_000)).toBe('2 minuti fa');
    });
  });
});