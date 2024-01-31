import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import info from '../../utils/info';

// const BackendUrl = 'http://localhost:3000/api/courses/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

   addCourse(name:string,description:string,videoURL:string,academyId:number): Observable<Course> {
    return this.http.post<Course>(
      info.BackendUrl+"courses/addCourse",
      {
        name,
        description,
        videoURL,
        academyId
      },
      httpOptions
    );
  }

  updateCourse(courseId:number,name:string,description:string,videoURL:string,academyId:number): Observable<Course> {
    return this.http.put<Course>(
      info.BackendUrl+"courses/updateCourse",
      {
        courseId,
        name,
        description,
        videoURL,
        academyId
      },
      httpOptions
    );
  }

  deleteCourse(courseId: number): Observable<Course> {
    return this.http.post<Course>(
      info.BackendUrl+"courses/deleteCourse",
      {
        courseId
      },
      httpOptions,
    );
  }

  getAllCoursesByAcademyId(academyId:number): Observable<Course[]> {
    return this.http.get<Course[]>(
      info.BackendUrl+"courses/getAllCoursesByAcademyId",
      {
        params:{
          academyId
        },
        headers: httpOptions.headers,
        responseType: 'json'
      },
    );
  }

  getOneCourseByCourseId(courseId:number): Observable<Course> {
    return this.http.get<Course>(
      info.BackendUrl+"courses/getOneCourseByCourseId",
      {
        params:{
          courseId
        },
        headers: httpOptions.headers,
        responseType: 'json'
      },
    );
  }





}
