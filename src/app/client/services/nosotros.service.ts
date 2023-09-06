import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nosotros } from 'src/app/core/interfaces/nosotros.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NosotrosService {

  constructor(private http: HttpClient) { }

  getNosotrosContent(): Observable<Nosotros>{
    return this.http.get<Nosotros>('assets/data/nosotros.json')
  }
}
