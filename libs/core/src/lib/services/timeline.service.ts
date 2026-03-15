import { Injectable, signal, computed } from '@angular/core';

export interface TimeRange {
  from: number;
  to:   number;
}

@Injectable({ providedIn: 'root' })
export class TimelineService {
  private readonly _isReplaying  = signal<boolean>(false);
  private readonly _replayTime   = signal<number>(Date.now());
  private readonly _historyRange = signal<TimeRange>({
    from: Date.now() - 24 * 60 * 60 * 1000, // ultime 24 ore
    to:   Date.now(),
  });
  private readonly _playbackSpeed = signal<number>(1);

  readonly isReplaying   = this._isReplaying.asReadonly();
  readonly replayTime    = this._replayTime.asReadonly();
  readonly historyRange  = this._historyRange.asReadonly();
  readonly playbackSpeed = this._playbackSpeed.asReadonly();

  readonly replayProgress = computed(() => {
    const range = this._historyRange();
    const current = this._replayTime();
    const total = range.to - range.from;
    if (total === 0) return 0;
    return Math.round(((current - range.from) / total) * 100);
  });

  startReplay(): void {
    this._isReplaying.set(true);
  }

  stopReplay(): void {
    this._isReplaying.set(false);
    this._replayTime.set(Date.now());
  }

  setReplayTime(timestamp: number): void {
    const range = this._historyRange();
    const clamped = Math.min(Math.max(timestamp, range.from), range.to);
    this._replayTime.set(clamped);
  }

  setHistoryRange(range: TimeRange): void {
    this._historyRange.set(range);
    this._replayTime.set(range.from);
  }

  setPlaybackSpeed(speed: number): void {
    this._playbackSpeed.set(speed);
  }

  seekToPercent(percent: number): void {
    const range = this._historyRange();
    const timestamp = range.from + ((range.to - range.from) * percent / 100);
    this.setReplayTime(timestamp);
  }
}