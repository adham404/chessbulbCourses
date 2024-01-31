import { Component, OnInit} from '@angular/core';
import { AcademyService } from 'src/app/_services/academy.service';
import { Academy } from 'src/app/models/academy';



@Component({
  selector: 'app-academies',
  templateUrl: './academies.component.html',
  styleUrls: ['./academies.component.css']
})
export class AcademiesComponent implements OnInit{
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
