import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaCardComponent } from './comida-card.component';

describe('ComidaCardComponent', () => {
  let component: ComidaCardComponent;
  let fixture: ComponentFixture<ComidaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComidaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComidaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
