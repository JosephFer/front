import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCineComponent } from './listar-cine.component';

describe('ListarCineComponent', () => {
  let component: ListarCineComponent;
  let fixture: ComponentFixture<ListarCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
