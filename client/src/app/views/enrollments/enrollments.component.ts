import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from 'src/app/_services/enrollment.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit{
  // approved: boolean = false;
  academyId!: string;
  enrollments: any[] = [];
  constructor(private route: ActivatedRoute, private enrollmentService: EnrollmentService) { }

  ngOnInit() {
    this.academyId = this.route.snapshot.paramMap.get('academyId')!;
    this.enrollmentService.getAllEnrollmentsByAcademyId(Number(this.academyId)).subscribe((data) => {
      this.enrollments = Object.values(data);
      console.log(this.enrollments)
    },error => {
      console.log(error);
    });
  }

  approveEnrollment(enrollment: any) {
    this.enrollmentService.updateEnrollment(enrollment.academyid,enrollment.userid,enrollment.instapayhandle,enrollment.approved).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    },error => {
      console.log(error);
    });
  }


}
