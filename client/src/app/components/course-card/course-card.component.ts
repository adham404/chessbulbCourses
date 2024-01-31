import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyService } from 'src/app/_services/academy.service';
import { EnrollmentService } from 'src/app/_services/enrollment.service';
import { SharedService } from 'src/app/_services/shared.service';
// import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
  @Input() course!: any;
  activationData: any = {};
  user: any = {};
  enrollment: any = {};
  academy: any = {};

  constructor( private router: Router, private sharedService: SharedService,private enrollmentService: EnrollmentService,private academyService: AcademyService) { }


  sendData() {

    this.user = JSON.parse(localStorage.getItem('user')!);
    this.enrollmentService.getOneEnrollmentByAcademyIdAndUserId(this.course.academyid, this.user.uid).subscribe((data) => {
      this.enrollment = data;
      this.academyService.getOneAcademyByAcademyId(this.course.academyid).subscribe((data) => {
        this.academy = data;
        this.activationData = {
          userId: this.user.uid,
          approved: this.enrollment.approved,
          ownerId: this.academy.ownerid,
          academyId: this.course.academyid,
        }
        this.sharedService.sendData(this.activationData);
        this.router.navigate(['/Course', this.course.courseid]);
      },error => {
        console.log(error);
      });
    },error => {
      console.log(error);
      this.activationData = {
        userId: this.user.uid,
        approved: null,
        ownerId: null,
        academyId: this.course.academyid,
      }
      this.sharedService.sendData(this.activationData);
      this.router.navigate(['/Course', this.course.courseid]);
    });
    
  }
}
