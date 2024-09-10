import { Component, ElementRef, Input, OnInit, ViewChild, input } from '@angular/core';
import { Doctor } from '../Models/doctor';
import { Observable, map, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-referred-doctor-autocomplete',
  standalone: true,
  imports: [MatInputModule,CommonModule,ReactiveFormsModule,FormsModule,AsyncPipe,MatAutocompleteModule,MatFormFieldModule],
  templateUrl: './referred-doctor-autocomplete.component.html',
  styleUrl: './referred-doctor-autocomplete.component.css'
})
export class ReferredDoctorAutocompleteComponent implements OnInit {
  ngOnInit(): void {
  
  }
  doctors:Doctor[]=[{
    doctorId:1,
    firstName:'dr',
    lastName:'doc1'
  },
  {
    doctorId:2,
    firstName:'dr',
    lastName:'doc2'
  }]
  filteredDoctor:Doctor[];
 @Input() doctorFormControl:FormControl<Doctor>;
 @ViewChild('doc') docInput:ElementRef<HTMLInputElement>;
  doctorFilter(){
   const value=this.docInput.nativeElement.value.toLocaleLowerCase();
   
    if (value != ''){
      this.filteredDoctor= this.doctors.filter(option => (
      (option.firstName.toLowerCase()+' '+option.lastName.toLowerCase()).includes(value)
  ));
    }
    else this.filteredDoctor= this.doctors;
  }
  
  displayDoctor(doctor:Doctor):string{
    return doctor ?doctor.firstName+' '+doctor.lastName:'';
  }
}
