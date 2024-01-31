import { Component, Input } from '@angular/core';
import { Academy } from 'src/app/models/academy';

@Component({
  selector: 'app-academy-card',
  templateUrl: './academy-card.component.html',
  styleUrls: ['./academy-card.component.css']
})
export class AcademyCardComponent {
    @Input() academy!: any;
}
