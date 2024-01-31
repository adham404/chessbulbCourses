import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import info from '../../utils/info';

// const info.BackendUrl = 'http://localhost:3000/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
       return this.http.get<User[]>(info.BackendUrl+"users/");
    
   }
   addUser(userId:string,name:string,email:string,photoURL:string,hasAcademy:boolean): Observable<User> {
    return this.http.post<User>(
      info.BackendUrl+"users/addUser",
      {
        userId,
        name,
        email,
        photoURL,
        hasAcademy
      },
      httpOptions
    );
  }
  updateUser(userId:number,name:string,email:string,photoURL:string,hasAcademy:boolean): Observable<User> {
    return this.http.put<User>(
      info.BackendUrl+"users/updateUser",
      {
        userId,
        name,
        email,
        photoURL,
        hasAcademy
      },
      httpOptions
    );
  }
  deleteUser(userId: number): Observable<User> {
    return this.http.post<User>(
      info.BackendUrl+"users/deleteUser",
      {
        userId
      },
      httpOptions,
    );
  }
  getUserById(userId:string): Observable<User> {
    return this.http.get<User>(
      info.BackendUrl+"users/getUser",
      {
        params: {
          userId
        },
        headers: httpOptions.headers,
        responseType: 'json' // Specify the response type as 'json'
      }
    );
  }

}