import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-formarray',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './formarray.component.html',
  styleUrl: './formarray.component.css'
})
export class FormarrayComponent implements OnInit {
  
  constructor(private fb:FormBuilder) {
    
  }
  RemoveEmp(index){
  this.getEmployees().removeAt(index);
  }
  RemoveSkill(empindex,skillIndex){
    this.getSkills(empindex).removeAt(skillIndex);
  }
  ngOnInit(): void {
   this.empForm= this.fb.group({
    employees:this.fb.array([this.fb.group({
      firstName:new FormControl(),
      lastName:new FormControl(),
      skills:this.fb.array([this.fb.group({
        language:new FormControl()
      })])
    })])
    })
  }

  empForm:FormGroup;
  getEmployees():FormArray{
    return this.empForm.get('employees') as FormArray;
  }
  AddEmp(){
    this.getEmployees().push(this.newEmployee());
  }
  AddSkill(index){
   this.newSkills(index);
  }
  newEmployee(){
    return this.fb.group({
      firstName:new FormControl(''),
      lastName:new FormControl(),
      skills:this.fb.array([])
    })
  }
  getSkills(index:number):FormArray{
    return this.getEmployees().at(index).get('skills') as FormArray
  }
  newSkills(index:number){
    this.getSkills(index).push(this.addSkills());
  }
  addEmployee(){
    this.getEmployees().push(this.newEmployee());
  }
  addSkills(){
    return this.fb.group({
      language:new FormControl('')
    })
  }
}
