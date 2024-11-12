import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCrearComponent } from './actualizar-crear.component';

describe('ActualizarCrearComponent', () => {
  let component: ActualizarCrearComponent;
  let fixture: ComponentFixture<ActualizarCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
