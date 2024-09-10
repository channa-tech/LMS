import { Validators } from "@angular/forms";
import { Address } from "./address";

export class Patient{
    
    public firstName! : string;
    
    public lastName! : string;
    
    public gender! : string;
    
    public age!: string;
    public address : Address=new Address();
   
  
   
}