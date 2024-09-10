import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Patient } from '../Models/patient';
import { Order } from '../Models/order';
import { CommonModule } from '@angular/common';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ContentProjectionComponent } from '../content-projection/content-projection.component';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { Observable, concatAll, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipListbox, MatChipsModule, MatChip } from '@angular/material/chips';
import { LabTest } from '../Models/labTest';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { Address } from '../Models/address';
import { Bill } from '../Models/bill';
import { Doctor } from '../Models/doctor';
import { ReferenceCenter } from '../Models/ReferenceCenter';
import { ReferenceCenterAutoCompleteComponent } from '../reference-center-auto-complete/reference-center-auto-complete.component';
import { ReferredDoctorAutocompleteComponent } from '../referred-doctor-autocomplete/referred-doctor-autocomplete.component';
export class CrossFieldErrorMatcher implements ErrorStateMatcher{
isErrorState(control: AbstractControl<any, any>, form: NgForm | FormGroupDirective): boolean {
   return control.dirty&&form.invalid;
  }

}
@Component({
  selector: 'app-home',
  standalone: true,
  providers: [Order],
  imports: [
    MatFormFieldModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatOption,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink, ReactiveFormsModule,
    FormsModule,
    MatChipListbox,
    CommonModule,
    MatChipsModule,
    ModalContentComponent,
    MatIconModule,
    ContentProjectionComponent,
  ReferenceCenterAutoCompleteComponent,
  ReferredDoctorAutocompleteComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  myForm: FormGroup;
  options: LabTest[] = [{
    testId: 1, name: 'test1', price: 500
  }, {
    testId: 2, name: 'test2', price: 700
  }, {
    testId: 3, name: 'test3', price: 600
  },
  {
    testId: 4, name: 'test4', price: 600
  },

  {
    testId: 5, name: 'test5', price: 600
  },

  {
    testId: 6, name: 'test6', price: 600
  }
  ];
  doctors:Doctor[]=[{
    doctorId:1,
    firstName:'dr',
    lastName:'channa'
  },
  {
    doctorId:2,
    firstName:'dr',
    lastName:'basava'
  }];
  errorMatcher=new CrossFieldErrorMatcher();
  selectedDoctor:Doctor;
  filteredDoctor:Observable<Doctor[]>;
  referenceCenters:ReferenceCenter[]=[{
    ReferenceCenterId:1,
    code:'REF 1',
    name:'Ref 1'
  },
  {
    ReferenceCenterId:1,
    code:'REF 1',
    name:'Ref 1'
  }]
  filteredOptions: Observable<LabTest[]>;
  selectedOptions: LabTest[] = [];
  
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['testId', 'name', 'price'];
  testInput: FormControl = new FormControl('');
  doctorInput:FormControl=new FormControl('');
  constructor(private fb: FormBuilder, private httpclient: HttpClient, private route: Router,
    private orderDetails: Order) {
    this.myForm = this.fb.group({
      patientDetails:this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        adhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        phone: ['', [Validators.required, Validators.maxLength(10)]],
        dateOfBirth: ['', [Validators.required, FutureDateValidatorFn]],
        gender: ['', Validators.required],
        address: this.fb.group({
          addressLine1: ['', [Validators.required, Validators.maxLength(200)]],
          addressLine2: ['', [Validators.maxLength(200)]],
          city: ['', [Validators.required, Validators.maxLength(20)]],
          state: ['', [Validators.required, Validators.maxLength(10)]],
          pincode: ['', [Validators.pattern('[0-9]{6}')]],
        })
      }),
      referenceDetails:this.fb.group({
        referredDoctor:new FormControl<Doctor>(null),
        referredCenter:new FormControl<ReferenceCenter>(null)
      }),
     
      testDetails: [[], Validators.required],
      billDetails:this.fb.group({
        discount: [0],
        totalBill:[{value:0}],
        amountPaid:[0,[Validators.required]]
      })
    }, {
      validators: [DiscountValidatorFn, TestsRequiredFn,AmountPaidCannotExceedTotalBillFn]
    });
    this.myForm.get('billDetails').get('totalBill')?.disable();
    this.myForm.get('testDetails').valueChanges.subscribe(v => {
      this.myForm.get('billDetails').get('totalBill').setValue(this.getTotal());
    })
  }
  getControl(){
  return this.myForm.get('referenceDetails').get('referredCenter') as FormControl<ReferenceCenter>
  }
  getReferredDoctorControl(){
    return this.myForm.get('referenceDetails').get('referredDoctor') as FormControl<Doctor>
  }
  onSubmit() {   
    console.log(JSON.stringify(this.myForm.getRawValue()));
    this.httpclient.post('http://localhost:5045/api/order',this.myForm.getRawValue(),{
     responseType:'text'
    }).subscribe({
      next:(val)=>{
        alert(val);
      },
      error:(err)=>{
        console.log(err);
      }
    });
    // this.route.navigate(['admin']);
  }
  
  ngOnInit(): void {
    this.filteredOptions = this.testInput.valueChanges.pipe(
      debounceTime(500),
      map(value => this._filter(value))
    );
   
    this.myForm.get('billDetails').get('discount').valueChanges.subscribe(val => {
      if (val) {
        const total = this.getTotal();
        this.myForm.get('billDetails').get('totalBill').setValue(total - val < 0 ? 0 : total - val);
      }
    })
    this.myForm.get('testDetails').valueChanges.subscribe(val=>{
      if(val){
        const total=this.getTotal();
        const discount=this.myForm.get('billDetails').get('discount').value;
        this.myForm.get('billDetails').get('totalBill').setValue(total - discount < 0 ? 0 : total - discount)
      }
    })
  }
  private _filter(value: string): LabTest[] {
    const filterValue = value.toLowerCase();
    if (filterValue != '')
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    else return this.options;
  }
  
 
  
 
  OnAutoCompleteSelect(event: any) {
    this.selectedOptions.push(this.options.find(o => o.name.toLowerCase() == event.option.viewValue));
    this.updateTests();
    this.filteredOptions = of(this.options.filter(o => !this.selectedOptions.map(m => m.name).includes(o.name)));
    event.option.deselect();
    this.renderRows();
  }
 
  add(event: any) {
    let val = this.options.find(v => v.name.toLowerCase() == event.value.toLowerCase());
    let isAlreadySelected = this.selectedOptions.find(v => v.name.toLowerCase() === val?.name?.toLowerCase());
    if (val && !isAlreadySelected) {
      this.selectedOptions.push(val);
      this.updateTests();
      this.renderRows();
    }
    event.chipInput!.clear();
  }
  renderRows() {
    if (this.table) {
      this.table.renderRows();
    }
  }
  getTotal(): number {
    if (this.selectedOptions?.length > 0)
      return this.selectedOptions?.map(t => t.price)?.reduce((t1, t2) => t1 + t2);
    else return 0;
  }
  remove(event: any) {
    this.selectedOptions.splice(this.selectedOptions.indexOf(event), 1);
    this.updateTests();
    this.filteredOptions = of(this.options.filter(o => !this.selectedOptions.includes(o)));
    this.renderRows();
  }

  updateTests() {
    this.myForm.get('testDetails').setValue(this.selectedOptions);
    this.myForm.get('testDetails').updateValueAndValidity({ emitEvent: true });
  }


}
export function AmountPaidCannotExceedTotalBillFn(control:AbstractControl):ValidationErrors | null{
  const totalBill=control.get('billDetails').get('totalBill').value;
  const amountPaid=control.get('billDetails').get('amountPaid').value;
  if(amountPaid&&amountPaid>totalBill){
    console.log('inside');
    return {'amountPaid':'amount paid cannot exceed total bill'};
  }
  console.log('outside');
  return null;
}
export function DiscountValidatorFn(control: AbstractControl): ValidationErrors | null {
  const values = control.get('testDetails').value as LabTest[]
  if (values?.length > 0) {
    const totalValue = values.map(t => t.price)?.reduce((t1, t2) => t1 + t2);

    if (control.value && (control.get('billDetails').get('discount').value > totalValue || control.get('billDetails').get('discount').value < 0)) {
      
      return { "discount": true }
    }
  }
  return null;
}

export function TestsRequiredFn(control: AbstractControl): ValidationErrors | null {

  const val = (control.get('testDetails').value as LabTest[]);
  if (val?.length > 0) {

    return null;
  }
  else {

    return { 'tests': 'please select tests' }
  }
}

export function FutureDateValidatorFn(control: AbstractControl): ValidationErrors | null {
  if (control.value) {
    let val = control.value as Date;
    if (val) {
      if (val.getDate() >= new Date().getDate())
        return { 'dateOfBirth': 'date cannot be future date' };
      else
        return null;
    }
  }
  return null;
}

