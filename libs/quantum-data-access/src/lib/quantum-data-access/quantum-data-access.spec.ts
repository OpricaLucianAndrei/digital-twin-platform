import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantumDataAccess } from './quantum-data-access';

describe('QuantumDataAccess', () => {
  let component: QuantumDataAccess;
  let fixture: ComponentFixture<QuantumDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantumDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
