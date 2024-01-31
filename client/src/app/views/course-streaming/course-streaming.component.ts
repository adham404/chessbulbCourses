import { Component, OnDestroy, OnInit} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';
// import { SharedService } from 'src/app/_services/shared.service';
// import { Subscription } from 'rxjs';
import videojs from 'video.js';
// declare let videojs: any;

@Component({
  selector: 'app-course-streaming',
  templateUrl: './course-streaming.component.html',
  styleUrls: ['./course-streaming.component.css']
})
export class CourseStreamingComponent implements OnInit, OnDestroy{
  constructor(private route: ActivatedRoute, private courseService: CourseService) { 

    // this.subscription = this.sharedService.data$.subscribe((data) => {
    //   this.courseData = data;
    // });
  }

  courseId!: string;
  courseData: any = {};
  // private subscription!: Subscription;
  player: any;




  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.courseService.getOneCourseByCourseId(Number(this.courseId)).subscribe((data) => {
      this.courseData = data;
      console.log(this.courseData)
      this.player = videojs('my-video');
      this.player.src({
        src: this.courseData.videourl,
        type: 'application/x-mpegURL'
      });
    },error => {
      console.log(error);
    }
    );


    setTimeout(() => {
      initFlowbite();;
    }, 1000);

    
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

}
