import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    headers = new HttpHeaders().set('Accept', 'text/plain')

    constructor(private http: HttpClient) { }

    upload(file: File, description: string, link: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();


        formData.append('file', file);
        formData.append('infos', new Blob([JSON.stringify({ "description": description, "link": link })], { type: "application/json" }));

        const req = new HttpRequest('POST', `${environment.endpoint}/upload`, formData, { headers: this.headers, responseType: 'text', withCredentials: true });

        return this.http.request(req);
    }

}