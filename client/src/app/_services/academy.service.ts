import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Academy } from '../models/academy';
import info from 'src/utils/info';

// const info.BackendUrl = 'http://localhost:3000/api/academy/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<Academy[]> {
       return this.http.get<Academy[]>(info.BackendUrl+"academy/getAllAcademies");
    
   }
   addAcademy(name:string,description:string,subscriptionFee:number,ownerId:string): Observable<Academy> {
    return this.http.post<Academy>(
      info.BackendUrl+"academy/addAcademy",
      {
        name,
        description,
        subscriptionFee,
        ownerId
      },
      httpOptions
    );
  }

  updateAcademy(academyId:number,name:string,description:string,subscriptionFee:number,ownerId:string): Observable<Academy> {
    return this.http.put<Academy>(
      info.BackendUrl+"academy/updateAcademy",
      {
        academyId,
        name,
        description,
        subscriptionFee,
        ownerId
      },
      httpOptions
    );
  }

  deleteAcademy(academyId: number): Observable<Academy> {
    return this.http.post<Academy>(
      info.BackendUrl+"academy/deleteAcademy",
      {
        academyId
      },
      httpOptions,
    );
  }

  getAcademyByOwnerId(ownerId:string): Observable<Academy> {
    return this.http.get<Academy>(
      info.BackendUrl+"academy/getOneAcademy",
      {
        params: {
          ownerId
        },
        headers: httpOptions.headers,
        responseType: 'json' // Specify the response type as 'json'
      }
    );
  }

  getOneAcademyByAcademyId(academyId:number): Observable<Academy> {
    return this.http.get<Academy>(
      info.BackendUrl+"academy/getOneAcademyByAcademyId",
      {
        params: {
          academyId
        },
        headers: httpOptions.headers,
        responseType: 'json' // Specify the response type as 'json'
      }
    );
  }

}
