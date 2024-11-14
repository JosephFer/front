import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComidaComponent } from './update-comida.component';

describe('UpdateComidaComponent', () => {
  let component: UpdateComidaComponent;
  let fixture: ComponentFixture<UpdateComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
