import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }


  getHeaders() {
    return this.http.get(`${ this._url }/header`)
  }

  addHeader(header: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(`${ this._url }/header`, header, httpOptions)
  }

  updateHeader(header: any, id: number) {
    console.log(header)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.patch(`${ this._url }/header/${ id }`, header, httpOptions)
  }

  removeHeader(id: number) {
    return this.http.delete(`${ this._url }/header/${ id }`)
  }
}
