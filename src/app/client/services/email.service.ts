import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  sendEmail(data: any) {
    return this.http.post(`${ this._url }/correo`, data)
  }
}
