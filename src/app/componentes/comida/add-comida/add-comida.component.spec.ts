import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComidaComponent } from './add-comida.component';

describe('AddComidaComponent', () => {
  let component: AddComidaComponent;
  let fixture: ComponentFixture<AddComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
