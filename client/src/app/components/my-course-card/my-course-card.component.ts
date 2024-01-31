import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { AcademyService } from 'src/app/_services/academy.service';
import { EnrollmentService } from 'src/app/_services/enrollment.service';

@Component({
  selector: 'app-my-course-card',
  templateUrl: './my-course-card.component.html',
  styleUrls: ['./my-course-card.component.css']
})
export class MyCourseCardComponent implements OnInit{
  @Input() course!: any;
  activationData: any = {};
  user: any = {};
  enrollment: any = {};
  academy: any = {};

  constructor(private courseService: CourseService, private sharedService: SharedService, private router: Router, private enrollmentService: EnrollmentService,private academyService: AcademyService) { }

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();;
    }, 1000);
  }
  
  deleteCourse(): void {
    this.courseService.deleteCourse(this.course.courseid)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

  sendData(): void {
    
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
