import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademyService } from 'src/app/_services/academy.service';
import { EnrollmentService } from 'src/app/_services/enrollment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  
  constructor(private academyService: AcademyService, private route: ActivatedRoute,private enrollmentService: EnrollmentService) { }
  academyId!: string;
  academyData: any = {};
  user!: any;
  instapayHandle!: string;
  toggle: boolean = false;
  enrollmentData: any = {};

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.academyId = this.route.snapshot.paramMap.get('academyId')!;
    this.academyService.getOneAcademyByAcademyId(Number(this.academyId)).subscribe((data) => {
      this.academyData = data;
      // console.log(this.academyData)
    },error => {
      console.log(error);
    }
    );

    this.enrollmentService.getOneEnrollmentByAcademyIdAndUserId(Number(this.academyId),this.user.uid).subscribe((data) => {
      this.enrollmentData = data;
      // console.log(this.enrollmentData)
    },error => {
      console.log(error);
    }
    );
  }

  addEnrollment(): void {
    const data = {
      academyId: Number(this.academyId),
      userId: this.user.uid,
      approved: false,
      instapayHandle: this.instapayHandle
    };

    this.enrollmentService.addEnrollment(data.academyId,data.userId,data.approved,data.instapayHandle)
      .subscribe(
        response => {
          console.log(response);
          this.toggle = true;
        },
        error => {
          console.log(error);
          this.toggle = true;
        });
  }

}
