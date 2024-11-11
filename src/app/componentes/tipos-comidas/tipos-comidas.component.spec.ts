import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposComidasComponent } from './tipos-comidas.component';

describe('TiposComidasComponent', () => {
  let component: TiposComidasComponent;
  let fixture: ComponentFixture<TiposComidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposComidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
