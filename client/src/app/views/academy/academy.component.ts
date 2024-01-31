import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademyService } from 'src/app/_services/academy.service';
import { CourseService } from 'src/app/_services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css']
})
export class AcademyComponent implements OnInit{
  
    constructor(private route: ActivatedRoute, private courseService: CourseService,private academyService: AcademyService) { }
    academyId!: string;
    courses: Course[] = [];
    academyData: any = {};
  
    ngOnInit() {
      this.academyId = this.route.snapshot.paramMap.get('academyId')!;
      this.academyService.getOneAcademyByAcademyId(Number(this.academyId)).subscribe((data) => {
        this.academyData = data;
        // console.log(this.academyData)
      },error => {
        console.log(error);
      });
      // console.log(this.academyId);
      this.courseService.getAllCoursesByAcademyId(Number(this.academyId)).subscribe(courses => {
        this.courses = Object.values(courses);
        // console.log(this.courses)
      },error => {
        console.log(error);
      }
      )
    }

}
