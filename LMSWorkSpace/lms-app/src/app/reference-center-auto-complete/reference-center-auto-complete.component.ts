import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, input } from '@angular/core';
import { ReferenceCenter } from '../Models/ReferenceCenter';
import{MatAutocompleteModule} from '@angular/material/autocomplete';
import{MatFormFieldModule}from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reference-center-auto-complete',
  standalone: true,
  imports: [MatInputModule,CommonModule,ReactiveFormsModule,FormsModule,AsyncPipe,MatAutocompleteModule,MatFormFieldModule],
  templateUrl: './reference-center-auto-complete.component.html',
  styleUrl: './reference-center-auto-complete.component.css'
})
export class ReferenceCenterAutoCompleteComponent implements OnInit {
 referenceCenters:ReferenceCenter[]=[
  {
  ReferenceCenterId:1,
  name:'ref1',
  code:'REF1'
 },
 {
  ReferenceCenterId:2,
  name:'ref2',
  code:'REF2'
 }
];
filteredCenter:ReferenceCenter[];
@Input() selectedCenterctrl:FormControl<ReferenceCenter>;
constructor() {
  
}
@ViewChild('centre') refCenter:ElementRef<HTMLInputElement>;
  ngOnInit(): void {
  
  }
  displayCenter(reference:ReferenceCenter):string{
  return reference?.name;
}
filter(){
  const value=this.refCenter.nativeElement.value;
  this.filteredCenter= this.referenceCenters.filter(v=> value==='' || v.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
}
}
