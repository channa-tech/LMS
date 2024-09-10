import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceCenterAutoCompleteComponent } from './reference-center-auto-complete.component';

describe('ReferenceCenterAutoCompleteComponent', () => {
  let component: ReferenceCenterAutoCompleteComponent;
  let fixture: ComponentFixture<ReferenceCenterAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceCenterAutoCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceCenterAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
