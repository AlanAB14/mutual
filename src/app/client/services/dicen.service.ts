import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DicenService {

  private _url = environment.apiBase

  constructor( private httpClient: HttpClient ) { }

  getDicen() {
    return this.httpClient.get(`${ this._url }/dicen`)
  }
}
