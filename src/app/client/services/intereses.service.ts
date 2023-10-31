import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteresesService {

  private _url = environment.apiBase;

  constructor(private http: HttpClient) { }

  getIntereses() {
    return this.http.get(`${ this._url }/intereses`)
  }

  editInteres(id: number, interes: any) {
    return this.http.patch(`${ this._url }/intereses/${ id }`, interes)
  }
}
