import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getServiciosSinImagen(): Observable<Servicio[]>{
    console.log('de aqui')
    return this.http.get<Servicio[]>(`${ this._url }/serviciosSinImagen`)
  }

  getServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`${ this._url }/servicios`)
  }

  updateServicio(servicio: any, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    console.log(`${ this._url }/servicios/${ id }`, JSON.stringify(servicio), httpOptions)
    return this.http.patch(`${ this._url }/servicios/${ id }`, JSON.stringify(servicio), httpOptions)
  }
}
