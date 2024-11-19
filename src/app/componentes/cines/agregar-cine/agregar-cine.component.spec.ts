import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCineComponent } from './agregar-cine.component';

describe('AgregarCineComponent', () => {
  let component: AgregarCineComponent;
  let fixture: ComponentFixture<AgregarCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
