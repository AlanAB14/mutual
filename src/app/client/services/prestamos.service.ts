import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  savePrestamo(tipo: string, data: any) {
    const body = {
      tipo,
      data: JSON.stringify(data)
    }
    return this.http.post(`${ this._url }/prestamos`, { body })
  }
}
