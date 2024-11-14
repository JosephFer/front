import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCrearButacasComponent } from './actualizar-crear-butacas.component';

describe('ActualizarCrearButacasComponent', () => {
  let component: ActualizarCrearButacasComponent;
  let fixture: ComponentFixture<ActualizarCrearButacasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCrearButacasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCrearButacasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
