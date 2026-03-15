import { TestBed } from '@angular/core/testing';
import { SvgDeviceRegistryService } from '../engine/svg-device-registry.service';
import { SvgRendererService } from '../engine/svg-renderer.service';
import { HeatmapService } from '../engine/heatmap.service';

describe('SvgDeviceRegistryService', () => {
  let service: SvgDeviceRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgDeviceRegistryService);
  });

  it('inizializza con registry vuoto', () => {
    expect(service.size()).toBe(0);
    expect(service.getAll()).toEqual([]);
  });

  it('registra un elemento SVG', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGElement;
    service.register('robot_arm_01', el, 'zone_a');
    expect(service.size()).toBe(1);
    expect(service.has('robot_arm_01')).toBe(true);
  });

  it('rimuove un elemento dal registry', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGElement;
    service.register('robot_arm_01', el, 'zone_a');
    service.unregister('robot_arm_01');
    expect(service.size()).toBe(0);
    expect(service.has('robot_arm_01')).toBe(false);
  });

  it('filtra per zona', () => {
    const el1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGElement;
    const el2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGElement;
    service.register('robot_arm_01', el1, 'zone_a');
    service.register('conveyor_01', el2, 'zone_b');
    expect(service.getByZone('zone_a').length).toBe(1);
    expect(service.getByZone('zone_b').length).toBe(1);
  });
});

describe('HeatmapService', () => {
  let service: HeatmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatmapService);
  });

  it('inizializza con heatmap disabilitata', () => {
    expect(service.enabled()).toBe(false);
  });

  it('toggle abilita e disabilita', () => {
    service.toggle();
    expect(service.enabled()).toBe(true);
    service.toggle();
    expect(service.enabled()).toBe(false);
  });

  it('enable e disable funzionano', () => {
    service.enable();
    expect(service.enabled()).toBe(true);
    service.disable();
    expect(service.enabled()).toBe(false);
  });
});

describe('SvgRendererService', () => {
  let service: SvgRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgRendererService);
  });

  it('inizializza con frame count zero', () => {
    expect(service.frameCount()).toBe(0);
  });
});