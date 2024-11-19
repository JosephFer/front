import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCineComponent } from './borrar-cine.component';

describe('BorrarCineComponent', () => {
  let component: BorrarCineComponent;
  let fixture: ComponentFixture<BorrarCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
