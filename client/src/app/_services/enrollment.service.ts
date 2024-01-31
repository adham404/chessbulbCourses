import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment';
import info from 'src/utils/info';

// const info.BackendUrl = 'http://localhost:3000/api/enrollments/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

    addEnrollment(academyId:number,userId:number,approved:boolean,instapayHandle:string): Observable<Enrollment> {
      return this.http.post<Enrollment>(
        info.BackendUrl+"enrollments/addEnrollment",
        {
          academyId,
          userId,
          approved,
          instapayHandle
        },
        httpOptions
      );
    }

    updateEnrollment(academyId:number,userId:number,approved:boolean,instapayHandle:boolean): Observable<Enrollment> {
      return this.http.put<Enrollment>(
        info.BackendUrl+"enrollments/updateEnrollment",
        {

          approved: approved,
          instapayHandle: instapayHandle,
          academyId: academyId,
          userId: userId,
        },
        httpOptions
      );
    }

    deleteEnrollment(academyId:number,userId:number): Observable<Enrollment> {
      return this.http.post<Enrollment>(
        info.BackendUrl+"enrollments/deleteEnrollment",
        {
          academyId,
          userId
        },
        httpOptions,
      );
    }

    getAllEnrollmentsByAcademyId(academyId:number): Observable<Enrollment[]> {
      return this.http.get<Enrollment[]>(
        info.BackendUrl+"enrollments/getAllEnrollmentsByAcademyId",
        {
          params:{
            academyId
          },
          headers: httpOptions.headers,
          responseType: 'json'
        }
      );
    }

    getOneEnrollmentByAcademyIdAndUserId(academyId:number,userId:number): Observable<Enrollment> {
      return this.http.get<Enrollment>(
        info.BackendUrl+"enrollments/getOneEnrollmentByAcademyIdAndUserId",
        {
          params:{
            academyId,
            userId
          },
          headers: httpOptions.headers,
          responseType: 'json'
        }
      );
    }


}
