import { Component, OnInit } from '@angular/core';
import { AcademyService } from 'src/app/_services/academy.service';
import { UserService } from 'src/app/_services/user.service';
import { Academy } from 'src/app/models/academy';
import { User } from 'src/app/models/user';
import { initFlowbite } from 'flowbite';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { VideoUploadService } from 'src/app/_services/video-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CourseService } from 'src/app/_services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-my-academy-page',
  templateUrl: './my-academy-page.component.html',
  styleUrls: ['./my-academy-page.component.css']
})
export class MyAcademyPageComponent implements OnInit{

  academyForm: any = {
    name: null,
    description: null,
    subscriptionFee: null
  };

  academyFormValidators: any = {
    name: true,
    description: true,
    subscriptionFee: true
  };

  courseForm: any = {
    name: null,
    description: null,
    videoURL: null
  };

  courseFormValidators: any = {
    name: true,
    description: true,
    videoURL: true
  };

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  userAuthData?: any;
  user: any = {hasacademy: true};
  academy!: any
  courses: Course[] = [];
  loading:boolean = false;
  academyLoading:boolean = false;


  ngOnInit(): void {
    this.userAuthData = JSON.parse(localStorage.getItem('user')!);
    // console.log(this.userAuthData);
    //TODO: get user from user service
    this.userService.getUserById(this.userAuthData.uid)
    .subscribe(
      data => {
        // const { status, carData } = data;
        this.user = data;
        // console.log(this.user);
        // console.log(status);
      },
      error => {
        console.log(error);
      });
      
      this.academyService.getAcademyByOwnerId(this.userAuthData.uid)
      .subscribe(
        data => {
          // const { status, carData } = data;
          this.academy = data;
          // console.log("Testing getAcademyByOwnerId in ngOnInit")
          // console.log(this.academy);
          // get courses
          this.courseService.getAllCoursesByAcademyId(this.academy.academyid)
          .subscribe(
            data => {
              this.courses = Object.values(data);
              // console.log("Testing getAllCoursesByAcademyId in ngOnInit")
              // console.log(this.courses);
            },
            error => {
              console.log(error);
            });



          // console.log(status);
        },
        error => {
          console.log(error);
          this.user.hasacademy = false;
          setTimeout(() => {
            initFlowbite();;
          }, 1000);
        });


      setTimeout(() => {
        initFlowbite();;
      }, 1000);
  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  constructor(private academyService: AcademyService, private userService: UserService, private videoUploadService: VideoUploadService, private courseService: CourseService) { }


  validateAcademyForm(): boolean {
    const { name, description, subscriptionFee } = this.academyForm;

    if (name) {
      this.academyFormValidators.name = true;
    } else {
      this.academyFormValidators.name = false;
    }

    if (description) {
      this.academyFormValidators.description = true;
    } else {
      this.academyFormValidators.description = false;
    }

    if (subscriptionFee) {
      this.academyFormValidators.subscriptionFee = true;
    } else {
      this.academyFormValidators.subscriptionFee = false;
    }

    if (this.academyFormValidators.name && this.academyFormValidators.description && this.academyFormValidators.subscriptionFee) {
      return true;
    }
    return false;
  }

  validateCourseForm(): boolean {
    const { name, description, videoURL } = this.courseForm;

    if (name) {
      this.courseFormValidators.name = true;
    } else {
      this.courseFormValidators.name = false;
    }

    if (description) {
      this.courseFormValidators.description = true;
    } else {
      this.courseFormValidators.description = false;
    }

    if (this.selectedFiles) {
      this.courseFormValidators.videoURL = true;
    } else {
      this.courseFormValidators.videoURL = false;
    }

    if (this.courseFormValidators.name && this.courseFormValidators.description && this.courseFormValidators.videoURL) {
      return true;
    }
    return false;
  }



  addAcademy(): void {
    console.log(this.academyForm);
    const { name, description, subscriptionFee } = this.academyForm;

    if (!this.validateAcademyForm()) {
      return;
    }

    const $targetEl = document.getElementById('create-academy-modal');

    const createAcademyModal: ModalInterface = new Modal($targetEl);

    createAcademyModal.hide();

    this.academyService.addAcademy(name, description, subscriptionFee, this.userAuthData.uid)
      .subscribe(
        data => {
          const academyData = data;
          console.log(academyData);
          //update user hasAcademy
          this.userService.updateUser(this.userAuthData.uid,this.userAuthData.displayName, this.userAuthData.email, this.userAuthData.photoURL, true)
            .subscribe(
              data => {
                this.user = data;
                setTimeout(() => {
                  initFlowbite();;
                }, 1000);
                // console.log(userData);
                // console.log(this.user);
                // console.log(status);
              },
              error => {
                console.log(error);
              });
        },
        error => {
          console.log(error);
        });


    this.academyForm = {
      name: null,
      description: null,
      subscriptionFee: null
    };
    setTimeout(() => {
      initFlowbite();;
    }, 1000);
  }





  deleteAcademy(): void {
    this.academyService.getAcademyByOwnerId(this.userAuthData.uid)
    .subscribe(
      data => {
        // const { status, carData } = data;
        this.academy = data;
        // console.log(this.academy.academyid);
        this.academyService.deleteAcademy(this.academy.academyid)
        .subscribe(
          data => {
            // const academyData = data;
            // console.log(academyData);
            //update user hasAcademy
            this.userService.updateUser(this.userAuthData.uid,this.userAuthData.displayName, this.userAuthData.email, this.userAuthData.photoURL, false)
              .subscribe(
                data => {
                  this.user = data;
                  // console.log(userData);
                  // console.log(this.user);
                  // console.log(status);
                },
                error => {
                  console.log(error);
                });
          },
          error => {
            console.log(error);
          });
        // console.log(status);
      },
      error => {
        console.log(error);
      });

        setTimeout(() => {
          initFlowbite();;
        }, 1000);
  }



 upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      // console.log(file)
      if (file) {
        this.currentFile = file;

        this.videoUploadService.uploadVideo(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
            
            if (this.progress === 100) {
             this.loading = true;
            }

            if (event.body){
              // console.log("Testing event.body.data")
              // console.log(event.body);
              this.courseForm.videoURL = event.body.cdnUrl;
              this.progress = 0;
              this.addCourse();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      // this.selectedFiles = undefined;
    }
  }


  addCourse(): void {


    if (!this.validateCourseForm()) {
      return;
    }


    this.academyService.getAcademyByOwnerId(this.userAuthData.uid)
    .subscribe(
      data => {
        this.academy = data;

        const { name, description, videoURL } = this.courseForm;
        const $targetEl = document.getElementById('create-course-modal');
    
        const createCourseModal: ModalInterface = new Modal($targetEl);
        
        // console.log("Modal element")
        // console.log($targetEl);
        createCourseModal.hide();
    
        this.courseService.addCourse(name, description, videoURL, this.academy.academyid)
          .subscribe(
            data => {
              const courseData = data;
              this.loading = false;
              // console.log(courseData);
              //update user hasAcademy
              this.courseService.getAllCoursesByAcademyId(this.academy.academyid)
              .subscribe(
                data => {
                  this.courses = Object.values(data);
                  // console.log("Testing getAllCoursesByAcademyId in addCourse")
                  // console.log(this.courses);
                },
                error => {
                  console.log(error);
                });
            },
            error => {
              console.log(error);
            });
    
            setTimeout(() => {
              initFlowbite();;
            }, 1000);
        this.courseForm = {
          name: null,
          description: null,
          videoURL: null
        };
      },
      error => {
        console.log(error);
      });



  }






}
