import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantumModels } from './quantum-models';

describe('QuantumModels', () => {
  let component: QuantumModels;
  let fixture: ComponentFixture<QuantumModels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumModels],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumModels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
