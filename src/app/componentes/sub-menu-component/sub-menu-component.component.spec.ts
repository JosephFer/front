import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuComponentComponent } from './sub-menu-component.component';

describe('SubMenuComponentComponent', () => {
  let component: SubMenuComponentComponent;
  let fixture: ComponentFixture<SubMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenuComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
