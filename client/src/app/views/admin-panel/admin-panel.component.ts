import { Component, OnInit} from '@angular/core';
import { AcademyService } from 'src/app/_services/academy.service';
import { Academy } from 'src/app/models/academy';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(private academyService: AcademyService) { }
  user ?: any
  academyExample = {
    academyId: 1,
    name: "Academy 1",
    description: "This is the first academy",
    subscriptionFee: 100,
    ownerId: "1"
  }
  academies!: Academy[]
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    // console.log(this.user)
    this.academyService.getAll().subscribe(academies => {
      this.academies = Object.values(academies);
      // console.log(this.academies)
    },error => {
      console.log(error);
    }
    )


  }
}
