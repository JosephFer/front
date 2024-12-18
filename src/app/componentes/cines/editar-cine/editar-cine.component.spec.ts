import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCineComponent } from './editar-cine.component';

describe('EditarCineComponent', () => {
  let component: EditarCineComponent;
  let fixture: ComponentFixture<EditarCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
