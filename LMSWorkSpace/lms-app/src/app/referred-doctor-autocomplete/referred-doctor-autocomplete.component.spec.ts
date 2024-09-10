import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredDoctorAutocompleteComponent } from './referred-doctor-autocomplete.component';

describe('ReferredDoctorAutocompleteComponent', () => {
  let component: ReferredDoctorAutocompleteComponent;
  let fixture: ComponentFixture<ReferredDoctorAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferredDoctorAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferredDoctorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
