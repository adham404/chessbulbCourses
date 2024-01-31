import { Component, Input } from '@angular/core';
import { Academy } from 'src/app/models/academy';

@Component({
  selector: 'app-admin-academy-card',
  templateUrl: './admin-academy-card.component.html',
  styleUrls: ['./admin-academy-card.component.css']
})
export class AdminAcademyCardComponent {
  @Input() academy!: any;
}
