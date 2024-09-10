import { AfterContentInit, Component, ContentChild, ElementRef, ViewChild, contentChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-content-projection',
  standalone: true,
  imports: [],
  templateUrl: './content-projection.component.html',
  styleUrl: './content-projection.component.css'
})
export class ContentProjectionComponent implements AfterContentInit {
  @ContentChild("header") div:ElementRef;
  ngAfterContentInit(): void {
    console.log(this.div);
  }

}
