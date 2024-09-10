import { HttpClient } from "@angular/common/http";
import { Bill } from "./bill";
import { LabTest } from "./labTest";
import { Patient } from "./patient";
import { filter } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class Order{
    public  patientDetails:Patient;
    
    public testDetails : LabTest[];
    
    public billDetails : Bill;
}