import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import info from '../../utils/info';



@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {
  // private baseUrl = 'http://localhost:3000/api/videos/';
  constructor(private http:HttpClient) { }

  uploadVideo(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    // console.log(formData);
    //send request to upload video

    
    

    const req = new HttpRequest('POST', `${info.BackendUrl}videos/uploadVideo`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    // return this.http.post(`${this.baseUrl}uploadVideo`, formData);


    return this.http.request(req);
  }



}


