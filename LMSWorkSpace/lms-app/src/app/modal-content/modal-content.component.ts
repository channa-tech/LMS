import { AfterViewInit, Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { ContentProjectionComponent } from '../content-projection/content-projection.component';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [ContentProjectionComponent],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css'
})
export class ModalContentComponent  {


}
