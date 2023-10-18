import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  savePrestamo(tipo: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const body = {
      tipo,
      data: JSON.stringify(data)
    }
    return this.http.post(`${ this._url }/prestamos`, body, httpOptions )
  }

  getPrestamos() {
    return this.http.get(`${ this._url }/prestamos`)
  }

  deletePrestamo(id: number) {
    return this.http.delete(`${ this._url }/prestamos/${ id }`)
  }
}
