import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoagingSpinnerComponent } from './loaging-spinner.component';

describe('LoagingSpinnerComponent', () => {
  let component: LoagingSpinnerComponent;
  let fixture: ComponentFixture<LoagingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoagingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoagingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
