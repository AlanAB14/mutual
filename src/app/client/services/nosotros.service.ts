import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nosotros } from 'src/app/core/interfaces/nosotros.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NosotrosService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getNosotrosContent(): Observable<Nosotros>{
    return this.http.get<Nosotros>(`${ this._url }/nosotros`)
  }

  updateNosotros(body: any, id: number) {
    console.log(body)
    return this.http.patch(`${this._url}/nosotros/${ id }`, body)
  }
}
